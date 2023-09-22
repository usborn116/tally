class Game < ApplicationRecord
    has_many :categories
    has_many :sessions
    belongs_to :user
end
