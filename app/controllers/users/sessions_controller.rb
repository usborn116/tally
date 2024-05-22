class Users::SessionsController < Devise::SessionsController
  skip_before_action :authenticate_user!  
  respond_to :json

  private
  def respond_with(resource, _opts = {})
    render json: resource
  end
  def respond_to_on_destroy
    render json: { message: "Logged out." }
  end

  end