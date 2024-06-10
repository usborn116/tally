class UsersController < ApplicationController

  skip_before_action :authenticate_user!
    
    def show

      include_options = build_include_options

      render json: current_user.as_json(include: include_options) || false
    end

    private

    def build_include_options
      return {} unless params[:include]

      params[:include].split(',').map do |association|
        case association
        when 'games'
          { games: {include: :sessions}}
        when 'sessions'
          { sessions: {include: :user}}
        when 'shared_sessions'
          { shared_sessions: {include: :user}}
        else
          {}
        end
      end.reduce({}, :merge)
    end


end
