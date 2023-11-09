class Session < ApplicationRecord
    belongs_to :game
    has_many :session_categories,  -> { order(name: :asc) }, dependent: :destroy
    has_many :session_players,  -> { order(id: :asc) }, dependent: :destroy
    has_many :session_scores, -> { order(id: :asc)}, dependent: :destroy

    accepts_nested_attributes_for :session_players, :session_scores

    after_create :create_categories

    def winner
        category_winners = self.session_players.map{|p| [p.name, p.winning_categories.size]}.select{|e| !e.last.zero?}
        max = category_winners&.max_by{|c| c&.last}&.last || self.session_players.map(&:total_score).max
        result = category_winners.map(&:last).sum > 0 ? 
            category_winners.select{|c| c.last == max} : self.session_players.select {|p| p.total_score == max}
        category_winner = !category_winners.map(&:last).sum.zero? ? true : false
        first_player = category_winner ? result&.first&.first : result&.first&.name
        result.length == 1 ? self.update(victor: first_player) : self.update(victor: 'Tied')
        result.length == 1 ? "#{first_player} wins this round of #{self.game.name}!" : "Tied between: #{result.map{|p| category_winner ? p.first : p.name}.join(", ")}"
    end

    private

    def create_categories
        self.game.categories.each{|c| self.session_categories.create(name: c.name, point_based: c.point_based, win: c.win)}
    end

end