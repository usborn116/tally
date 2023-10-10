class HomepageController < ApplicationController
  def index
  end

  def get_user
    render json: current_user || false
  end

  def not_exist
    render json: {type: 'error', message: 'Not found'}
  end
end
