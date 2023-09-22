class CreateSessionPlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :session_players do |t|
      t.string :name

      t.timestamps
    end
  end
end
