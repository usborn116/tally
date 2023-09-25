require 'rails_helper'

RSpec.describe Session, type: :model do
  before(:context) do
    @user = @user = User.last || User.create(name:'Usertest', email: 'user_email@email.com', password:'userpassword')
    @game = @user.games.create
    @sesh = @game.sessions.create
    @player1 = @sesh.session_players.create(name: 'Usborn')
    @player2 = @sesh.session_players.create(name: 'Ashley')
    @score1 = @player1.session_scores.create(amount: 0)
    @score2 = @player2.session_scores.create(amount: 0)
  end

  context 'after both players have scores' do

    it 'finds player 1 as winner' do
      @score1.update(amount: 4)
      @score2.update(amount: 3)
      expect(@player1.total_score).to eq(4)
      expect(@sesh.winner).to eq("#{@player1.name} wins this round of #{@game.name}!")
    end
    
    it 'finds player 2 as winner' do
      @score1.update(amount: 4)
      @score2.update(amount: 5)
      expect(@player2.total_score).to eq(5)
      expect(@sesh.winner).to eq("#{@player2.name} wins this round of #{@game.name}!")
    end

  end
end
