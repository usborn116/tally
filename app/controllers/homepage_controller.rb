class HomepageController < ApplicationController
  def index
  end

  def get_user
    render json: current_user.to_json(:include => [{:games => {:include => [:sessions]}}, {:sessions => {:include => [:user]}}, {:shared_sessions => {:include => [:user]}}]) || false
  end

  def not_exist
    render json: {type: 'error', message: 'Not found'}
  end
end
