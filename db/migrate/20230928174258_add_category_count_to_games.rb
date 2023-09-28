class AddCategoryCountToGames < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :category_count, :integer
  end
end
