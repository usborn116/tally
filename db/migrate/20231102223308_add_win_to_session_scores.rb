class AddWinToSessionScores < ActiveRecord::Migration[7.0]
  def change
    add_column :session_scores, :win, :boolean
  end
end
