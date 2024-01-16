class AddUserToSessions < ActiveRecord::Migration[7.0]
  def change
    add_reference :sessions, :user, foreign_key: true
  end
end
