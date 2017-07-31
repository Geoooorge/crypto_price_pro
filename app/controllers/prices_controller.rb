class PricesController < ApplicationController
  def index
    @prices = Price.all
  end
end
