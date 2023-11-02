class SessionCategoriesController < ApplicationController
  before_action :set_session_category, only: %i[ show edit update destroy ]
  before_action :authenticate_user!

  # GET /session_categories or /session_categories.json
  def index
    @session_categories = SessionCategory.all
  end

  # GET /session_categories/1 or /session_categories/1.json
  def show
  end

  # GET /session_categories/new
  def new
    @session_category = SessionCategory.new
  end

  # GET /session_categories/1/edit
  def edit
  end

  # POST /session_categories or /session_categories.json
  def create
    @session_category = SessionCategory.new(session_category_params)

    if @session_category.save
      render json: @session_category
    else
      render json: @session_category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /session_categories/1 or /session_categories/1.json
  def update
      if @session_category.update(session_category_params)
        render json: @session_category
      else
        render json: @session_category.errors, status: :unprocessable_entity
      end
  end

  # DELETE /session_categories/1 or /session_categories/1.json
  def destroy
    @session_category.destroy

    render json: {message: 'okay'}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session_category
      @session_category = SessionCategory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def session_category_params
      params.require(:session_category).permit(:name, :point_based, :session_id, :win)
    end
end
