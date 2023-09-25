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

    respond_to do |format|
      if @session_category.save
        format.html { redirect_to session_category_url(@session_category), notice: "Session category was successfully created." }
        format.json { render :show, status: :created, location: @session_category }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @session_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /session_categories/1 or /session_categories/1.json
  def update
    respond_to do |format|
      if @session_category.update(session_category_params)
        format.html { redirect_to session_category_url(@session_category), notice: "Session category was successfully updated." }
        format.json { render :show, status: :ok, location: @session_category }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @session_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /session_categories/1 or /session_categories/1.json
  def destroy
    @session_category.destroy

    respond_to do |format|
      format.html { redirect_to session_categories_url, notice: "Session category was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_session_category
      @session_category = SessionCategory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def session_category_params
      params.require(:session_category).permit(:name, :point_based)
    end
end
