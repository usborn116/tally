Rails.application.routes.draw do
  resources :session_scores
  resources :session_players
  resources :session_categories
  resources :sessions
  resources :categories
  resources :games
  get 'user_games', to: 'games#user_games'
  get 'user_game/:id', to: 'games#user_game'
  get 'session_winner/:id', to: 'sessions#get_winner'
  resources :players
  devise_for :users
  root 'homepage#index'
  get 'get_user', to: 'homepage#get_user'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
