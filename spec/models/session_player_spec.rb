require 'rails_helper'

RSpec.describe SessionPlayer, type: :model do
  before(:context) do
    @user = User.last || User.create(name:'Usertest', email: 'user_email@email.com', password:'userpassword')
    @user.save!
    @game = @user.games.create
    @sesh = @game.sessions.create
    @player1 = @sesh.session_players.create(name: 'Usborn')
    @player2 = @sesh.session_players.create(name: 'Ashley')
    @player1.session_scores.create(amount: 4)
    @player1.session_scores.create(amount: 6)
    @player2.session_scores.create(amount: 4)
    @player2.session_scores.create(amount: 3)
  end

  context 'after all scores are entered' do
    it 'calculates the first players total score' do
      expect(@player1.total_score).to eq(10)
    end

    it 'calculates the second players total score' do
      expect(@player2.total_score).to eq(7)
    end
  end
end
