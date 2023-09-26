class HomepageController < ApplicationController
  def index
  end

  def get_user
    render json: current_user || nil
  end
end
