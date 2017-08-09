Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => "/sidekiq"
  devise_for :users

  resources :notifications
  root "prices#index"

  namespace :api do
    namespace :v1 do
      resources :notifications
      resources :prices do
        get 'chart_prices', on: :collection
        get 'chart_stream', on: :collection
      end
    end
  end
end
