require 'httparty'

namespace :trades do
  task default: 'trades:all_pricing'

  desc "Bitstamp BTC-USD API"
  task bitstamp_btc_usd: :environment do
    response = HTTParty.get('https://www.bitstamp.net/api/v2/ticker_hour/btcusd/')
    Price.create(
      currency_pair: 'btcusd',
      exchange: 'bitstamp',
      last: response['last'].to_f
    )
  end

  desc "Bitstamp LTC-USD API"
  task bitstamp_ltc_usd: :environment do
    response = HTTParty.get('https://www.bitstamp.net/api/v2/ticker_hour/ltcusd/')
    Price.create(
      currency_pair: 'ltcusd',
      exchange: 'bitstamp',
      last: response['last'].to_f
    )
  end

  desc "Coinbase BTC-USD API"
  task coinbase_btc_usd: :environment do
    response = HTTParty.get('https://api.coinbase.com/v2/prices/BTC-USD/spot')
    Price.create(
      currency_pair: 'btcusd',
      exchange: 'coinbase',
      last: response['data']['amount'].to_f
    )
  end

  desc "Coinbase ETH-USD API"
  task coinbase_eth_usd: :environment do
    response = HTTParty.get('https://api.coinbase.com/v2/prices/ETH-USD/spot')
    Price.create(
      currency_pair: 'ethusd',
      exchange: 'coinbase',
      last: response['data']['amount'].to_f
    )
  end

  desc "Bitfinex BTC-USD API"
  task bitfinex_btc_usd: :environment do
    response = HTTParty.get('https://api.bitfinex.com/v1/pubticker/btcusd')
    Price.create(
      currency_pair: 'btcusd',
      exchange: 'bitfinex',
      last: response['last_price'].to_f
    )
  end

  desc "Bitfinex ETH-USD API"
  task bitfinex_eth_usd: :environment do
    response = HTTParty.get('https://api.bitfinex.com/v1/pubticker/ethusd')
    Price.create(
      currency_pair: 'ethusd',
      exchange: 'bitfinex',
      last: response['last_price'].to_f
    )
  end

  desc "Bitfinex LTC-USD API"
  task bitfinex_ltc_usd: :environment do
    response = HTTParty.get('https://api.bitfinex.com/v1/pubticker/ltcusd')
    Price.create(
      currency_pair: 'ltcusd',
      exchange: 'bitfinex',
      last: response['last_price'].to_f
    )
  end

  desc "Run all task for pricing data"
  task all_pricing: [:bitstamp_btc_usd, :bitstamp_ltc_usd, :coinbase_btc_usd, :coinbase_eth_usd, :bitfinex_btc_usd, :bitfinex_eth_usd, :bitfinex_ltc_usd] do
  end
end
