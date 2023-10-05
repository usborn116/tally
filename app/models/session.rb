class Session < ApplicationRecord
    belongs_to :game
    has_many :session_categories,  -> { order(name: :asc) }, dependent: :destroy
    has_many :session_players,  -> { order(id: :asc) }, dependent: :destroy
    has_many :session_scores, -> { order(id: :asc)}, dependent: :destroy

    accepts_nested_attributes_for :session_players, :session_scores

    after_create :create_categories

    def winner
        max = self.session_players.map(&:total_score).max
        result = self.session_players.select {|p| p.total_score == max}
        result.length == 1 ? self.update(victor: result.first.name) : self.update(victor: 'Tied')
        result.length == 1 ? "#{result.first.name} wins this round of #{self.game.name}!" :  "Tied between: #{result.map{|p| p.name}.join(", ")}"
    end

    private

    def create_categories
        self.game.categories.each{|c| self.session_categories.create(name: c.name, point_based: c.point_based, win: c.win)}
    end

end