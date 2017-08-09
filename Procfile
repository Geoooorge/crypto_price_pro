web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}
priceworker: bundle exec sidekiq ./app/workers/price_worker.rb
