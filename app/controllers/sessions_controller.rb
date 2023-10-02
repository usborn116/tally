class SessionsController < ApplicationController
  before_action :set_session, only: %i[ show edit update destroy get_winner ]
  before_action :authenticate_user!

  # GET /sessions or /sessions.json
  def index
    @sessions = Session.all
  end

  # GET /sessions/1 or /sessions/1.json
  def show
    @players = current_user.players
    @sesh = JSON.parse(@session.to_json(:include => [:game, :session_players, :session_categories, {:session_scores=> {:include => [:session_player, :session_category]}}]))
    render json: {session: @sesh, players: @players }
  end

  def get_winner
    render json: {message: @session.winner }
  end

  # GET /sessions/new
  def new
    @session = Session.new
  end

  # GET /sessions/1/edit
  def edit
  end

  # POST /sessions or /sessions.json
  def create
    @session = Session.new(session_params)

    if @session.save
      render json: @session
    else
      render json: @session.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /sessions/1 or /sessions/1.json
  def update
    if @session.update(session_params)
      render json: @session
    else
      render json: @session.errors, status: :unprocessable_entity
    end
  end

  # DELETE /sessions/1 or /sessions/1.json
  def destroy
    @session.destroy

    render json: {message: 'okay'}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session
      @session = Session.find(params[:id])
      #@session = Session.where(id: params[:id]).includes(:game, :session_scores)
    end

    # Only allow a list of trusted parameters through.
    def session_params
      params.require(:session).permit(:date, :game_id)
    end
end
