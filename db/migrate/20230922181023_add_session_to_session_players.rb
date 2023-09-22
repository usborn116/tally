class AddSessionToSessionPlayers < ActiveRecord::Migration[7.0]
  def change
    add_reference :session_players, :session, null: false, foreign_key: true
  end
end
