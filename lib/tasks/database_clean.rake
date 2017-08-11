desc "Clean old database price data"
task clean_prices: :environment do
  Price.where("created_at <= ?", 3.hours.ago).delete_all
end
