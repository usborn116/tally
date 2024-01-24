class CreateSessionShares < ActiveRecord::Migration[7.0]
  def change
    create_table :session_shares do |t|
      t.belongs_to :user
      t.belongs_to :session
      t.timestamps
    end
  end
end
