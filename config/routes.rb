Rails.application.routes.draw do
  scope '/api' do
    resources :session_scores
    resources :session_players
    resources :session_categories
    resources :sessions do
      get 'winner', on: :member
      resource :session_shares, only: [:create]
    end
    resources :categories
    resources :games
    resources :players
    resource :user, only: [:show]
    devise_for :users,
      controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations'
      }
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
