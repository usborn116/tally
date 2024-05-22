class UsersController < ApplicationController

  skip_before_action :authenticate_user!
    
    def show
      render json: current_user.as_json(:include => [{:games => {:include => [:sessions]}}, {:sessions => {:include => [:user]}}, {:shared_sessions => {:include => [:user]}}]) || false
    end
end