class CreatePrices < ActiveRecord::Migration[5.1]
  def change
    create_table :prices do |t|
      t.string :exchange, null: false
      t.string :currency_pair, null: false
      t.decimal :last, null: false

      t.timestamps null: false
    end
  end
end
