require 'rails_helper'

RSpec.describe SessionPlayer, type: :model do
  before(:context) do
    @user = User.last || User.create(name:'Usertest', email: 'user_email@email.com', password:'userpassword')
    @user.save!
    @game = @user.games.create
    @cat1 = @game.categories.create(name: 'Cat 1')
    @cat2 = @game.categories.create(name: 'Cat 2')
    @sesh = @game.sessions.create
    @player1 = @sesh.session_players.create(name: 'Usborn')
    @player2 = @sesh.session_players.create(name: 'Ashley')
  end

  context 'after each session player is created' do
    it 'creates a 0 score for each category' do
      expect(@player1.total_score).to eq(0)
      expect(@player2.total_score).to eq(0)
      expect(@sesh.session_scores.length).to eq(4)
      expect(@player1.session_scores.length).to eq(2)
      expect(@player2.session_scores.length).to eq(2)
    end

    it 'calculates the first players total score' do
      @player1.session_scores.first.update(amount: 4)
      @player1.session_scores.last.update(amount: 6)
      expect(@player1.total_score).to eq(10)
    end

    it 'calculates the second players total score' do
      @player2.session_scores.first.update(amount: 4)
      @player2.session_scores.last.update(amount: 3)
      expect(@player2.total_score).to eq(7) 
    end

  end

end
