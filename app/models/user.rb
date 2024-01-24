class User < ApplicationRecord
  has_many :games, dependent: :destroy
  has_many :players, dependent: :destroy
  has_many :sessions, dependent: :destroy
  has_many :session_shares, foreign_key: 'collaborator_id'
  has_many :shared_sessions, :through => :session_shares
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
