class SessionSharesController < ApplicationController
  before_action :set_session, only: %i[ create ]
  before_action :authenticate_user!

  # POST /session_shareor /session_players.json
  def create
    begin
      render json: {message: @session.share(params[:share][:email]) }
    rescue StandardError => e
      render json: {message: e.message}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session
      @session = Session.find(params[:session_id])
    end

end
