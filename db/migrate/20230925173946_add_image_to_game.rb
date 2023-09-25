class AddImageToGame < ActiveRecord::Migration[7.0]
  def change
    add_column :games, :image, :string
  end
end
