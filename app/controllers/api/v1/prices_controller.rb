class Api::V1::PricesController < ApplicationController
  def index
    render json: Price.last(210)
  end

  def chart_prices
    render json: Price.where(exchange: 'bitfinex').where(currency_pair: 'btcusd').or(Price.where(exchange: 'coinbase').where(currency_pair: 'btcusd')).or(Price.where(exchange: 'bitstamp').where(currency_pair: 'btcusd')).last(300)
  end

  def chart_stream
    render json: Price.last(30)
  end
end
