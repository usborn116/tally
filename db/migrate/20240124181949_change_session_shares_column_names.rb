class ChangeSessionSharesColumnNames < ActiveRecord::Migration[7.0]
  def change
    rename_column :session_shares, :user_id, :collaborator_id
    rename_column :session_shares, :session_id, :shared_session_id
  end
end
