Rails.application.routes.draw do
  devise_for :users

  resources :notifications
  root "prices#index"
end
