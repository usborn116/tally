class Session < ApplicationRecord
    belongs_to :game
    has_many :session_categories, dependent: :destroy
    has_many :session_players, dependent: :destroy
    has_many :session_scores, dependent: :destroy

    accepts_nested_attributes_for :session_players, :session_scores
    
    after_create :create_categories

    def winner
        result = self.session_players.map{|p| [p.name, p.total_score]}.to_h.max_by{|k,v| v}.first
        "#{result} wins this round of #{self.game.name}!"
    end

    private

    def create_categories
        self.game.categories.each{|c| self.session_categories.create(name: c.name, point_based: c.point_based, win: c.win)}
    end

end