Rails.application.routes.draw do

  get 'cart/show'
  devise_for :users
  root to: 'restaurants#index'
  resources :restaurants, only: [:index, :show]
  resources :orders, only: [:create]
  get '/cart', to: 'cart#show'
  post '/cartinfo', to: 'cart#cartinfo'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
