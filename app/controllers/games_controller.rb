class GamesController < ApplicationController
  before_action :set_game, only: %i[ show edit update destroy most_winner ]
  skip_before_action :authenticate_user!, only: %i[index]

  # GET /games or /games.json
  def index
    if current_user
      @games = user_games
    else
      @games = Game.top_five
    end

    include_options = build_include_options
    render json: @games.as_json(include: include_options)
  end

  # GET /games/1 or /games/1.json
  def show

    include_options = build_include_options

    @game = Game.find(params[:id])
    if @game 
      #@result = JSON.parse(@game.game_relationships)
      @result = @game.as_json(include: include_options)
      @result['results'] = @game.results if params[:include]&.split(',')&.include?('results')
      render json: @result
    else
      render json: @game.errors
    end
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

    def build_include_options
      return {} unless params[:include]

      params[:include].split(',').map do |association|
        case association
        when 'categories'
          { categories: {} }
        when 'session_shares'
          {sessions: {include: [:session_shares => {only: :collaborator_id}]} }
        when 'sessions'
          {:sessions => {only: [:id, :date, :victor, :user_id]}}
        else
          {}
        end
      end.reduce({}, :merge)
    end

    # Only allow a list of trusted parameters through.
    def game_params
      params.require(:game).permit(:name, :game_category, :image, :gameplay_length, :player_number, :complexity, categories_attributes: [:name, :point_based])
    end

    def user_games
      params[:name] ? Game.includes(:sessions).filter_by_name(params[:name]) : 
      Game.user_games(current_user.id)
    end
end
