require 'twilio-ruby'

class Text < ApplicationRecord

  def self.send_text(phone, first_name, exchange, currency_pair, direction, target_price, last_price)
    name = first_name
    @client = Twilio::REST::Client.new(ENV["TWILIO_ACCOUNT_SID"], ENV["TWILIO_AUTH_TOKEN"])

    @client.messages.create({
      :from => "+1#{ENV["TWILIO_FROM_NUMBER"]}",
      :to => "+1#{phone}",
      body: "Hi #{name}! The price of #{currency_pair.upcase} (#{exchange.capitalize}) is now #{direction} #{target_price} at #{last_price}! - G"
      })
  end
end
