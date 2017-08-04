class NotificationSerializer < ActiveModel::Serializer
  attributes :id, :exchange, :currency_pair, :direction, :notification_type, :target_price, :status, :notifications_max, :notifications_sent, :user_id
end
