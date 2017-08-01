class Notification < ApplicationRecord
  belongs_to :user
  validates :exchange, presence: true
  validates :currency_pair, presence: true
  validates :direction, presence: true
  validates :notification_type, presence: true
  validates :target_price, numericality: true
  validates :status, presence: true
end
