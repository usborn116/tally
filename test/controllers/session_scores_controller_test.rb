require "test_helper"

class SessionScoresControllerTest < ActionDispatch::IntegrationTest
  setup do
    @session_score = session_scores(:one)
  end

  test "should get index" do
    get session_scores_url
    assert_response :success
  end

  test "should get new" do
    get new_session_score_url
    assert_response :success
  end

  test "should create session_score" do
    assert_difference("SessionScore.count") do
      post session_scores_url, params: { session_score: { amount: @session_score.amount } }
    end

    assert_redirected_to session_score_url(SessionScore.last)
  end

  test "should show session_score" do
    get session_score_url(@session_score)
    assert_response :success
  end

  test "should get edit" do
    get edit_session_score_url(@session_score)
    assert_response :success
  end

  test "should update session_score" do
    patch session_score_url(@session_score), params: { session_score: { amount: @session_score.amount } }
    assert_redirected_to session_score_url(@session_score)
  end

  test "should destroy session_score" do
    assert_difference("SessionScore.count", -1) do
      delete session_score_url(@session_score)
    end

    assert_redirected_to session_scores_url
  end
end
