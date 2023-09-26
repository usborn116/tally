class ChangeTypeToGameCategory < ActiveRecord::Migration[7.0]
  def change
    rename_column :games, :type, :game_category
  end
end
