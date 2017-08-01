class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :notifications
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true
  validates :phone, numericality: { only_integer: true }, length: { is: 10 }, allow_blank: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
