require "application_system_test_case"

class SessionCategoriesTest < ApplicationSystemTestCase
  setup do
    @session_category = session_categories(:one)
  end

  test "visiting the index" do
    visit session_categories_url
    assert_selector "h1", text: "Session categories"
  end

  test "should create session category" do
    visit session_categories_url
    click_on "New session category"

    fill_in "Name", with: @session_category.name
    check "Point based" if @session_category.point_based
    click_on "Create Session category"

    assert_text "Session category was successfully created"
    click_on "Back"
  end

  test "should update Session category" do
    visit session_category_url(@session_category)
    click_on "Edit this session category", match: :first

    fill_in "Name", with: @session_category.name
    check "Point based" if @session_category.point_based
    click_on "Update Session category"

    assert_text "Session category was successfully updated"
    click_on "Back"
  end

  test "should destroy Session category" do
    visit session_category_url(@session_category)
    click_on "Destroy this session category", match: :first

    assert_text "Session category was successfully destroyed"
  end
end
