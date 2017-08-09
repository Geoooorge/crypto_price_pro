require 'sidekiq-scheduler'
require 'httparty'


class PriceWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform
    response = HTTParty.get('https://www.bitstamp.net/api/v2/ticker_hour/btcusd/')
    Price.create(
      currency_pair: 'btcusd',
      exchange: 'bitstamp',
      last: response['last'].to_f
    )

    response = HTTParty.get('https://api.coinbase.com/v2/prices/BTC-USD/spot')
    Price.create(
      currency_pair: 'btcusd',
      exchange: 'coinbase',
      last: response['data']['amount'].to_f
    )

    response = HTTParty.get('https://api.coinbase.com/v2/prices/ETH-USD/spot')
    Price.create(
      currency_pair: 'ethusd',
      exchange: 'coinbase',
      last: response['data']['amount'].to_f
    )

    response = HTTParty.get('https://api.bitfinex.com/v1/pubticker/btcusd')
    Price.create(
      currency_pair: 'btcusd',
      exchange: 'bitfinex',
      last: response['last_price'].to_f
    )

    response = HTTParty.get('https://api.bitfinex.com/v1/pubticker/ethusd')
    Price.create(
      currency_pair: 'ethusd',
      exchange: 'bitfinex',
      last: response['last_price'].to_f
    )

    response = HTTParty.get('https://api.bitfinex.com/v1/pubticker/ltcusd')
    Price.create(
      currency_pair: 'ltcusd',
      exchange: 'bitfinex',
      last: response['last_price'].to_f
    )

    response = HTTParty.get('https://www.bitstamp.net/api/v2/ticker_hour/ltcusd/')
    Price.create(
      currency_pair: 'ltcusd',
      exchange: 'bitstamp',
      last: response['last'].to_f
    )
  end
end
