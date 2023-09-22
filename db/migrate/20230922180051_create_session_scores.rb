class CreateSessionScores < ActiveRecord::Migration[7.0]
  def change
    create_table :session_scores do |t|
      t.integer :amount

      t.timestamps
    end
  end
end
