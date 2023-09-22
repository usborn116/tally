require "test_helper"

class SessionPlayersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @session_player = session_players(:one)
  end

  test "should get index" do
    get session_players_url
    assert_response :success
  end

  test "should get new" do
    get new_session_player_url
    assert_response :success
  end

  test "should create session_player" do
    assert_difference("SessionPlayer.count") do
      post session_players_url, params: { session_player: { name: @session_player.name } }
    end

    assert_redirected_to session_player_url(SessionPlayer.last)
  end

  test "should show session_player" do
    get session_player_url(@session_player)
    assert_response :success
  end

  test "should get edit" do
    get edit_session_player_url(@session_player)
    assert_response :success
  end

  test "should update session_player" do
    patch session_player_url(@session_player), params: { session_player: { name: @session_player.name } }
    assert_redirected_to session_player_url(@session_player)
  end

  test "should destroy session_player" do
    assert_difference("SessionPlayer.count", -1) do
      delete session_player_url(@session_player)
    end

    assert_redirected_to session_players_url
  end
end
