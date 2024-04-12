class Game < ApplicationRecord
    has_many :categories,  -> { order(:id => :asc) }, dependent: :destroy
    has_many :sessions, -> { order(:date => :desc) }, dependent: :destroy
    belongs_to :user

    accepts_nested_attributes_for :categories

    scope :filter_by_name, ->(name) { where("LOWER(name) like ?", "%#{name.downcase}%").distinct }

    private

end
