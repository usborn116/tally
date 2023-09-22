require "test_helper"

class SessionCategoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @session_category = session_categories(:one)
  end

  test "should get index" do
    get session_categories_url
    assert_response :success
  end

  test "should get new" do
    get new_session_category_url
    assert_response :success
  end

  test "should create session_category" do
    assert_difference("SessionCategory.count") do
      post session_categories_url, params: { session_category: { name: @session_category.name, point_based: @session_category.point_based } }
    end

    assert_redirected_to session_category_url(SessionCategory.last)
  end

  test "should show session_category" do
    get session_category_url(@session_category)
    assert_response :success
  end

  test "should get edit" do
    get edit_session_category_url(@session_category)
    assert_response :success
  end

  test "should update session_category" do
    patch session_category_url(@session_category), params: { session_category: { name: @session_category.name, point_based: @session_category.point_based } }
    assert_redirected_to session_category_url(@session_category)
  end

  test "should destroy session_category" do
    assert_difference("SessionCategory.count", -1) do
      delete session_category_url(@session_category)
    end

    assert_redirected_to session_categories_url
  end
end
