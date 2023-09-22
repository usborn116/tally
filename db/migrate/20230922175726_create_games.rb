class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :name
      t.string :type
      t.string :gameplay_length
      t.string :player_number
      t.string :complexity

      t.timestamps
    end
  end
end
