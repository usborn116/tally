class SessionPlayersController < ApplicationController
  before_action :set_session_player, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /session_players or /session_players.json
  def index
    @session_players = SessionPlayer.all
  end

  # GET /session_players/1 or /session_players/1.json
  def show
  end

  # GET /session_players/new
  def new
    @session_player = SessionPlayer.new
  end

  # GET /session_players/1/edit
  def edit
  end

  # POST /session_players or /session_players.json
  def create
    @session_player = SessionPlayer.new(session_player_params)

      if @session_player.save!
        render json: @session_player
      else
        render json: @session_player.errors, status: :unprocessable_entity
      end
  end

  # PATCH/PUT /session_players/1 or /session_players/1.json
  def update
    if @session_player.update(session_player_params)
      render json: @session_player
    else
      render json: @session_player.errors, status: :unprocessable_entity
    end
  end

  # DELETE /session_players/1 or /session_players/1.json
  def destroy
    @session_player.destroy

    render json: {message: 'okay'}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session_player
      @session_player = SessionPlayer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def session_player_params
      params.require(:session_player).permit(:name, :session_id)
    end
end
