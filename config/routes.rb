Rails.application.routes.draw do
  devise_for :users

  resources :notifications
  root "prices#index"

  namespace :api do
    namespace :v1 do
      resources :notifications
    end
  end
end
