class GamesController < ApplicationController
  before_action :set_game, only: %i[ show edit update destroy most_winner ]
  before_action :authenticate_user!, only: %i[new show edit create update destroy]

  # GET /games or /games.json
  def index
    @games = Game.includes(:sessions).left_joins(:sessions).group(:id).order('COUNT(sessions.id) DESC, created_at').first(5)
    render json: @games.to_json(:include => {:sessions => {only: [:id, :date, :victor]}})
  end

  def user_games
    initial = Game.joins(sessions: :user).left_joins(sessions: {session_shares: :collaborator})
    @games = params[:name] ? Game.includes(:sessions).filter_by_name(params[:name]) : 
    initial.where('session_shares.collaborator_id' => current_user.id).or(initial.where('sessions.user_id' => current_user.id))
    .group(:id).order('COUNT(sessions.id) DESC, created_at')

    #games where current user has been shared sessions:
    #Game.joins(sessions: [:user, {session_shares: :collaborator}]).where('session_shares.collaborator_id' => current_user.id).group(:id)

    #games where current user has created sessions:
    #Game.joins(sessions: [:session_shares, :user]).where('sessions.user_id' => current_user.id).group(:id))


    render json: @games.to_json(:include => {:sessions => {only: [:id, :date, :victor]}})
  end

  def user_game
    @game = Game.find(params[:id])
    if @game 
      @result = JSON.parse(@game.to_json(:include => [:categories, {:sessions => {only: [:id, :date, :victor]}}]))
      @result['results'] = @game&.sessions&.map(&:victor)&.tally&.sort_by{|k, v| v}&.reverse&.map do |item|
        {player: item.first, wins: item.last}
      end
      render json: @result
    else
      render json: @game.errors
    end
  end

  # GET /games/1 or /games/1.json
  def show
  end

  # GET /games/new
  def new
    @game = Game.new
  end

  # GET /games/1/edit
  def edit
  end

  # POST /games or /games.json
  def create
    @game = current_user.games.new(game_params)

    if @game.save
      render json: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /games/1 or /games/1.json
  def update
    if @game.update(game_params)
      render json: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # DELETE /games/1 or /games/1.json
  def destroy
    @game.destroy

    render json: {status: 'successful'}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:name, :game_category, :image, :gameplay_length, :player_number, :complexity, categories_attributes: [:name, :point_based])
    end
end
