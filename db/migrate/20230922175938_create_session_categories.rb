class CreateSessionCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :session_categories do |t|
      t.string :name
      t.boolean :point_based

      t.timestamps
    end
  end
end
