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

    respond_to do |format|
      if @session_player.save
        format.html { redirect_to session_player_url(@session_player), notice: "Session player was successfully created." }
        format.json { render :show, status: :created, location: @session_player }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @session_player.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /session_players/1 or /session_players/1.json
  def update
    respond_to do |format|
      if @session_player.update(session_player_params)
        format.html { redirect_to session_player_url(@session_player), notice: "Session player was successfully updated." }
        format.json { render :show, status: :ok, location: @session_player }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @session_player.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /session_players/1 or /session_players/1.json
  def destroy
    @session_player.destroy

    respond_to do |format|
      format.html { redirect_to session_players_url, notice: "Session player was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session_player
      @session_player = SessionPlayer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def session_player_params
      params.require(:session_player).permit(:name)
    end
end
