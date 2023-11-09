class Game < ApplicationRecord
    has_many :categories,  -> { order(:name => :asc) }, dependent: :destroy
    has_many :sessions, -> { order(:date => :desc) }, dependent: :destroy
    belongs_to :user

    accepts_nested_attributes_for :categories

    after_create :create_categories

    scope :filter_by_name, ->(name) { where("LOWER(name) like ?", "%#{name.downcase}%").distinct }

    private

    def create_categories
        return if !self.category_count
        self.category_count.times { self.categories.create(name: 'New Category/Round', point_based: true) }
    end

end
