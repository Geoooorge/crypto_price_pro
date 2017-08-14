class AlertMailer < ApplicationMailer

  def new_alert(notification, price)
    @notification = notification
    @price = price

    mail(
    to: notification.user.email,
    subject: "Price Alert: #{price.currency_pair} - #{price.last}"
    )
  end
end
