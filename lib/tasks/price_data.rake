require 'httparty'

namespace :trades do
  desc "This task calls the Bitstamp BTC-USD API and is called by the Heroku Sheduler add-on"
  task bitstamp_btc_usd: :environment do
    response = HTTParty.get('https://www.bitstamp.net/api/v2/ticker_hour/btcusd/')
    new_price = Price.create(
    currency_pair: 'btcusd',
    exchange: 'bitstamp',
    last: response['last'].to_f
    )
  end
end
