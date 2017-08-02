namespace :notify do
  desc "Compare last price to notification price points"
  task compare: :environment do
    @price = Price.where(exchange: 'bitstamp').where(currency_pair: 'btcusd').last
    @notifications = Notification.where(status: 'active')

    @notifications.each do |notification|
      if @price.exchange == notification.exchange && @price.currency_pair == notification.currency_pair
        if notification.direction == 'below' && @price.last < notification.target_price
          notification.increment(:notifications_sent)
          notification.save
          # send notification to user based on preference
        elsif notification.direction == 'above' && @price.last > notification.target_price
          notification.increment(:notifications_sent)
          notification.save
          # send notification to user based on preference
        else
        end
        if notification.notifications_sent >= notification.notifications_max
          notification.status = 'inactive'
          notification.save
        end
      end
    end
  end
end
