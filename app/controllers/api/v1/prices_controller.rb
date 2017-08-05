class Api::V1::PricesController < ApplicationController
  def index
    render json: Price.last(20)
  end
end
