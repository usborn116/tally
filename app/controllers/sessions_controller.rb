class SessionsController < ApplicationController
  before_action :set_session, only: %i[ show edit update destroy winner ]

  # GET /sessions or /sessions.json
  def index
    @sessions = Session.all
  end

  # GET /sessions/1 or /sessions/1.json
  def show
    include_options = build_include_options

    render json: @session.as_json(include: include_options)
  end

  def winner
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

    def build_include_options
      return {} unless params[:include]

      params[:include].split(',').map do |association|
        case association
        when 'players'
          { user: {include: :players }}
        when 'game'
          { game: @session.game }
        when 'collaborators'
          { collaborators: {}}
        when 'session_scores'
          { session_scores: {include: [:session_player, :session_category]}}
        when 'session_players'
          { session_players: {include: :session_scores }}
        when 'session_categories'
          { session_categories: {include: :session_scores }}
        else
          {}
        end
      end.reduce({}, :merge)
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_session
      @session = Session.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def session_params
      params.require(:session).permit(:date, :game_id, :user_id)
    end
end
