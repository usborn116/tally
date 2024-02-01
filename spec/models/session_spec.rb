require 'rails_helper'

RSpec.describe Session, type: :model do
  before(:context) do
    @user = User.first || User.create(name:'Usertest', email: 'user_email@email.com', password:'userpassword')
    @user2 = @user2 = User.last || User.create(name:'Usertest2', email: 'user_email2@email.com', password:'userpassword')
    @user.save
    @user2.save
    @game = @user.games.create(name: 'Game 1')
    @game.save
    @cat1 = @game.categories.create(name: 'Copied Cat 1', point_based: true)
    @cat2 = @game.categories.create(name: 'Copied Cat 2', point_based: false)
    @cat1.save
    @cat2.save
    @sesh = @game.sessions.create(user_id: @user.id)
    @sesh.save
    @player1 = @sesh.session_players.create(name: 'Usborn')
    @player2 = @sesh.session_players.create(name: 'Ashley')
    @player1.save
    @player2.save
  end

  context 'when a session is created' do

    it 'creates copies of all categories from the parent game' do
      expect(@sesh.session_categories.map(&:name).sort).to eq(@game.categories.map(&:name).sort)
    end

    it 'all session scores belong to a session, player and session category' do
      @scores = @player1.session_scores + @player2.session_scores
      @scores.each do |score|
        expect(score.session_id).not_to be(nil)
        expect(score.session_category_id).not_to be(nil)
        expect(score.session_player_id).not_to be(nil)
      end
    end

  end

  context 'when sharing a session' do

    it 'shares the session to an existing user' do
      expect(@sesh.share('user_email2@email.com')).to be("Share with user_email2@email.com successful!")
    end

    it 'all session scores belong to a session, player and session category' do
      @scores = @player1.session_scores + @player2.session_scores
      @scores.each do |score|
        expect(score.session_id).not_to be(nil)
        expect(score.session_category_id).not_to be(nil)
        expect(score.session_player_id).not_to be(nil)
      end
    end

  end

  context 'after both players have scores' do

    it 'finds player 1 as winner' do
      @player1.session_scores.each{|s| s.update(amount: 2)}
      @player2.session_scores.each{|s| s.update(amount: 1)}
      expect(@player1.total_score).to eq(4)
      expect(@sesh.winner).to eq("#{@player1.name} wins this round of #{@game.name}!")
      expect(@sesh.victor).to eq(@player1.name)
    end
    
    it 'finds player 2 as winner' do
      @player1.session_scores.each{|s| s.update(amount: 1)}
      @player2.session_scores.each{|s| s.update(amount: 3)}
      expect(@player2.total_score).to eq(6)
      expect(@player1.total_score).to eq(2)
      expect(@sesh.winner).to eq("#{@player2.name} wins this round of #{@game.name}!")
      expect(@sesh.victor).to eq(@player2.name)
    end

    it 'finds ties' do
      @player1.session_scores.each{|s| s.update(amount: 1)}
      @player2.session_scores.each{|s| s.update(amount: 1)}
      expect(@player2.total_score).to eq(2)
      expect(@player1.total_score).to eq(2)
      expect(@sesh.winner).to start_with("Tied between: ")
      expect(@sesh.victor).to eq('Tied')
    end

  end
end
