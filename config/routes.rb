Rails.application.routes.draw do
  scope '/api' do
    resources :session_scores
    resources :session_players
    resources :session_categories
    resources :sessions
    resources :categories
    resources :games
    #get 'user_game/:id', to: 'games#user_game'
    get 'session_winner/:id', to: 'sessions#get_winner'
    resources :players
    devise_for :users,
      controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations'
      }
    get 'get_user', to: 'homepage#get_user'
    put 'create_share/:id', to: 'sessions#create_share'
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
