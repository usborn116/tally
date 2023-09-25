class AddWinToSessionCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :session_categories, :win, :boolean
  end
end
