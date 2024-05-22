class UsersController < ApplicationController
    
    def show
      render json: current_user.as_json(:include => [{:games => {:include => [:sessions]}}, {:sessions => {:include => [:user]}}, {:shared_sessions => {:include => [:user]}}]) || false
    end
end