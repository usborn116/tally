class SessionPlayer < ApplicationRecord
    belongs_to :session
    has_many :session_scores
    
    def total_score
        self.session_scores.map(&:amount).sum
    end


end
