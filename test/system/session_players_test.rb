require "application_system_test_case"

class SessionPlayersTest < ApplicationSystemTestCase
  setup do
    @session_player = session_players(:one)
  end

  test "visiting the index" do
    visit session_players_url
    assert_selector "h1", text: "Session players"
  end

  test "should create session player" do
    visit session_players_url
    click_on "New session player"

    fill_in "Name", with: @session_player.name
    click_on "Create Session player"

    assert_text "Session player was successfully created"
    click_on "Back"
  end

  test "should update Session player" do
    visit session_player_url(@session_player)
    click_on "Edit this session player", match: :first

    fill_in "Name", with: @session_player.name
    click_on "Update Session player"

    assert_text "Session player was successfully updated"
    click_on "Back"
  end

  test "should destroy Session player" do
    visit session_player_url(@session_player)
    click_on "Destroy this session player", match: :first

    assert_text "Session player was successfully destroyed"
  end
end
