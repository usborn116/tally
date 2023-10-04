class SessionPlayer < ApplicationRecord
    belongs_to :session
    has_many :session_scores, -> { order(id: :asc) }, dependent: :destroy

    after_create :create_scores
    
    def total_score
        self.session_scores.map(&:amount).sum
    end

    private

    def create_scores
        session_id = self.session.id
        self.session.session_categories.each do |c|
            self.session_scores.create(amount: 0, session_id: session_id, session_category_id: c.id)
        end
    end


end
