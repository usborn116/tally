class Game < ApplicationRecord
    has_many :categories, dependent: :destroy
    has_many :sessions, dependent: :destroy
    belongs_to :user

    accepts_nested_attributes_for :categories
end
