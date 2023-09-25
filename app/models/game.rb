class Game < ApplicationRecord
    has_many :categories, dependent: :destroy
    has_many :sessions, dependent: :destroy
    belongs_to :user
end
