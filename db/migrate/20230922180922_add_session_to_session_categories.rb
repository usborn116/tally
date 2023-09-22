class AddSessionToSessionCategories < ActiveRecord::Migration[7.0]
  def change
    add_reference :session_categories, :session, null: false, foreign_key: true
  end
end
