class AddVictorToSession < ActiveRecord::Migration[7.0]
  def change
    add_column :sessions, :victor, :string
  end
end
