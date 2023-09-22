class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.date :date

      t.timestamps
    end
  end
end
