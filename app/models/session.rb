class Session < ApplicationRecord
    belongs_to :game
    has_many :session_categories,  -> { order(name: :asc) }, dependent: :destroy
    has_many :session_players,  -> { order(id: :asc) }, dependent: :destroy
    has_many :session_scores, -> { order(id: :asc)}, dependent: :destroy

    accepts_nested_attributes_for :session_players, :session_scores

    after_create :create_categories

    def winner
        category_winners = self.session_players
            .map{|p| [p.name, p.winning_categories]}
            .sort_by(&:last).reverse
        if category_winners.map(&:last).flatten.length > 0
            max = category_winners.max_by{|c| c.last.length}.last.length
            result = category_winners.select{|c| c.last.length == max}
            result.length == 1 ? self.update(victor: category_winners.first.first) : self.update(victor: 'Tied')
            result.length == 1 ? "#{category_winners.first.first} wins this round of #{self.game.name}!" : "Tied between: #{result.map{|p| p.first}.join(", ")}"
        else
            max = self.session_players.map(&:total_score).max
            result = self.session_players.select {|p| p.total_score == max}
            result.length == 1 ? self.update(victor: result.first.name) : self.update(victor: 'Tied')
            result.length == 1 ? "#{result.first.name} wins this round of #{self.game.name}!" :  "Tied between: #{result.map{|p| p.name}.join(", ")}"
        end
    end

    private

    def create_categories
        self.game.categories.each{|c| self.session_categories.create(name: c.name, point_based: c.point_based, win: c.win)}
    end

end