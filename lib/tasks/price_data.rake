require 'httparty'

namespace :trades do
  desc "Bitstamp BTC-USD API called by the Heroku Sheduler add-on"
  task bitstamp_btc_usd: :environment do
    response = HTTParty.get('https://www.bitstamp.net/api/v2/ticker_hour/btcusd/')
    Price.create(
      currency_pair: 'btcusd',
      exchange: 'bitstamp',
      last: response['last'].to_f
    )
  end
end
