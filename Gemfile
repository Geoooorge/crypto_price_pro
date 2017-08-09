source 'https://rubygems.org/'

gem 'rails', '~> 5.1.2'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'jquery-rails'
gem 'httparty'
gem 'devise'
gem 'twilio-ruby'
gem 'webpacker'
gem "active_model_serializers"
gem 'materialize-sass'
gem 'material_icons'
gem 'sidekiq'
gem 'sinatra', github: 'sinatra/sinatra'
gem 'sidekiq-scheduler'

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :development, :test do
  gem 'capybara'
  gem 'factory_girl_rails'
  gem 'launchy', require: false
  gem 'pry-rails'
  gem 'rspec-rails'
  gem 'shoulda'
  gem 'valid_attribute'
  gem 'dotenv-rails', require: 'dotenv/rails-now'
end

group :test do
  gem 'coveralls', require: false
end

group :production do
  gem 'rails_12factor'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

ruby '2.3.3'
