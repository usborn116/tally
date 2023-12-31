class SessionPlayer < ApplicationRecord
    belongs_to :session
    has_many :session_scores, -> { order(id: :asc) }, dependent: :destroy

    after_create :create_scores
    
    def total_score
        self.session_scores.map(&:amount).sum
    end

    def winning_categories
        self.session_scores.where(win: true).map{|t| t.session_category.name}
    end

    private

    def create_scores
        self.session.session_categories.each do |c|
            self.session_scores.create(amount: 0, session_id: self.session.id, session_category_id: c.id, win: c.win)
        end
    end


end
