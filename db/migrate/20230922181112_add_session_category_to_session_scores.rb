class AddSessionCategoryToSessionScores < ActiveRecord::Migration[7.0]
  def change
    add_reference :session_scores, :session_category, null: false, foreign_key: true
  end
end
