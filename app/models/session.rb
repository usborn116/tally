class Session < ApplicationRecord
    belongs_to :game
    has_many :session_categories
    has_many :session_players
    has_many :session_scores

    def winner
        result = self.session_players.map{|p| [p.name, p.total_score]}.to_h.max_by{|k,v| v}.first
        "#{result} wins this round of #{self.game.name}!"
    end
end
