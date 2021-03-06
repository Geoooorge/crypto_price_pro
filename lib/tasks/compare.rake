require 'twilio-ruby'

namespace :notify do
  desc "Compare last price to notification price points"
  task compare: :environment do

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
                send_text(notification.user.phone, notification.user.first_name, @price.exchange, notification.currency_pair, notification.direction, notification.target_price, @price.last)
              elsif notification.notification_type == 'email'
                AlertMailer.new_alert(notification, @price).deliver_now
              end
            elsif notification.direction == 'above' && @price.last > notification.target_price
              notification.increment(:notifications_sent)
              notification.save
              if notification.notification_type == 'text'
                send_text(notification.user.phone, notification.user.first_name, @price.exchange, notification.currency_pair, notification.direction, notification.target_price, @price.last)
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

def send_text(phone, first_name, exchange, currency_pair, direction, target_price, last_price)
  name = first_name
  @client = Twilio::REST::Client.new(ENV["TWILIO_ACCOUNT_SID"], ENV["TWILIO_AUTH_TOKEN"])

  @client.messages.create({
    :from => "+1#{ENV["TWILIO_FROM_NUMBER"]}",
    :to => "+1#{phone}",
    body: "Hi #{name}! The price of #{currency_pair.upcase} (#{exchange.capitalize}) is now #{direction} #{target_price} at #{last_price}! - G"
    })
end
