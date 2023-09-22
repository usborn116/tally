require "application_system_test_case"

class SessionScoresTest < ApplicationSystemTestCase
  setup do
    @session_score = session_scores(:one)
  end

  test "visiting the index" do
    visit session_scores_url
    assert_selector "h1", text: "Session scores"
  end

  test "should create session score" do
    visit session_scores_url
    click_on "New session score"

    fill_in "Amount", with: @session_score.amount
    click_on "Create Session score"

    assert_text "Session score was successfully created"
    click_on "Back"
  end

  test "should update Session score" do
    visit session_score_url(@session_score)
    click_on "Edit this session score", match: :first

    fill_in "Amount", with: @session_score.amount
    click_on "Update Session score"

    assert_text "Session score was successfully updated"
    click_on "Back"
  end

  test "should destroy Session score" do
    visit session_score_url(@session_score)
    click_on "Destroy this session score", match: :first

    assert_text "Session score was successfully destroyed"
  end
end
