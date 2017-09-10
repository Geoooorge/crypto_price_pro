class Notification < ApplicationRecord
  belongs_to :user
  validates :exchange, presence: true
  validates :currency_pair, presence: true
  validates :direction, presence: true
  validates :notification_type, presence: true
  validates :target_price, numericality: true
  validates :status, presence: true


  def self.compare
    combination = {
      "bitstamp": ["btcusd", "ltcusd"],
      "coinbase": ["btcusd", "ethusd"],
      "bitfinex": ["btcusd", "ethusd", "ltcusd"]
    }

    combination.each do |n|
      i = 0
      while i < combination[n[0]].length

        @price = Price.where(exchange: n[0]).where(currency_pair: combination[n[0]][i]).last
        @notifications = Notification.where(status: 'active')

        @notifications.each do |notification|
          if @price.exchange == notification.exchange && @price.currency_pair == notification.currency_pair
            if notification.direction == 'below' && @price.last < notification.target_price
              notification.increment(:notifications_sent)
              notification.save
              if notification.notification_type == 'text'
                Text.send_text(notification.user.phone, notification.user.first_name, @price.exchange, notification.currency_pair, notification.direction, notification.target_price, @price.last)
              elsif notification.notification_type == 'email'
                AlertMailer.new_alert(notification, @price).deliver_now
              end
            elsif notification.direction == 'above' && @price.last > notification.target_price
              notification.increment(:notifications_sent)
              notification.save
              if notification.notification_type == 'text'
                Text.send_text(notification.user.phone, notification.user.first_name, @price.exchange, notification.currency_pair, notification.direction, notification.target_price, @price.last)
              elsif notification.notification_type == 'email'
                AlertMailer.new_alert(notification, @price).deliver_now
              end
            else
            end
            if notification.notifications_sent >= notification.notifications_max
              notification.status = 'inactive'
              notification.save
            end
          end
        end
        i += 1
      end
    end
  end
end
