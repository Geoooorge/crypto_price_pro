class Price < ApplicationRecord
  validates :last, presence: true, numericality: true
  validates :exchange, presence: true
  validates :currency_pair, presence: true
end
