class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.string :exchange, null: false
      t.string :currency_pair, null: false
      t.string :direction, null: false
      t.string :notification_type, null: false
      t.decimal :target_price, null: false
      t.string :status, null: false
      t.integer :notifications_max, null: false, default: 1
      t.integer :notifications_sent, null: false, default: 0
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
