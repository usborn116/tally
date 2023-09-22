class SessionScoresController < ApplicationController
  before_action :set_session_score, only: %i[ show edit update destroy ]

  # GET /session_scores or /session_scores.json
  def index
    @session_scores = SessionScore.all
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

    respond_to do |format|
      if @session_score.save
        format.html { redirect_to session_score_url(@session_score), notice: "Session score was successfully created." }
        format.json { render :show, status: :created, location: @session_score }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @session_score.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /session_scores/1 or /session_scores/1.json
  def update
    respond_to do |format|
      if @session_score.update(session_score_params)
        format.html { redirect_to session_score_url(@session_score), notice: "Session score was successfully updated." }
        format.json { render :show, status: :ok, location: @session_score }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @session_score.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /session_scores/1 or /session_scores/1.json
  def destroy
    @session_score.destroy

    respond_to do |format|
      format.html { redirect_to session_scores_url, notice: "Session score was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session_score
      @session_score = SessionScore.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def session_score_params
      params.require(:session_score).permit(:amount)
    end
end
