class Game < ApplicationRecord
    has_many :categories,  -> { order(:id => :asc) }, dependent: :destroy
    has_many :sessions, -> { order(:date => :desc) }, dependent: :destroy
    belongs_to :user

    accepts_nested_attributes_for :categories

    scope :filter_by_name, ->(name) { where("LOWER(name) like ?", "%#{name.downcase}%").distinct }

    scope :user_games, ->(user_id) {
			left_joins(sessions: :session_shares)
			.where('session_shares.collaborator_id = ? OR sessions.user_id = ?', user_id, user_id)
			.group(:id)
			.order('COUNT(sessions.id) DESC, created_at')
    }

		scope :top_five, -> { 
			left_joins(:sessions)
			.select('games.*, COUNT(sessions.id) AS sessions_count')
			.group('games.id')
			.order('sessions_count DESC, games.created_at')
			.limit(5)
		}

		def game_relationships
			self.to_json(:include => 
			[ :categories, 
				{:sessions => {only: [:id, :date, :victor, :user_id],
					:include => [
						{ :session_shares => {only: [:collaborator_id]} }
					]} 
				}]
			)
		end
		
		def results
			self&.sessions
					&.map(&:victor)
					&.tally
					&.sort_by{|k, v| -v}
					&.map { |item| {player: item[0], wins: item[-1]} }
		end

    private

end
