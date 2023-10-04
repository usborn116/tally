class SessionScoresController < ApplicationController
  before_action :set_session_score, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /session_scores or /session_scores.json
  def index
    @session_scores = SessionScore.includes(:session_category, :session_player)
  end

  # GET /session_scores/1 or /session_scores/1.json
  def show 
  end

  # GET /session_scores/new
  def new
    @session_score = SessionScore.new
  end

  # GET /session_scores/1/edit
  def edit
  end

  # POST /session_scores or /session_scores.json
  def create
    @session_score = SessionScore.new(session_score_params)

    if @session_score.save
      render json: @session_score
    else
      render json: @session_score.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /session_scores/1 or /session_scores/1.json
  def update
      if @session_score.update(session_score_params)
        render json: @session_score
      else
        render json: @session_score.errors, status: :unprocessable_entity
      end
  end

  # DELETE /session_scores/1 or /session_scores/1.json
  def destroy
    @session_score.destroy

    render json: {message: 'okay'}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session_score
      @session_score = SessionScore.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def session_score_params
      params.require(:session_score).permit(:amount, :session_category_id, :session_player_id, :session_id)
    end
end
