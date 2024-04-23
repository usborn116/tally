require "rails_helper"

RSpec.describe SessionMailer, type: :mailer do

  before(:context) do
    @user = User.create(name: 'Test', email: 'test@test.com')
  end

  context 'shared session email' do
      
      let(:mail){ SessionMailer.with(user: @user, date: Date.new(2023, 1, 1).strftime("%m/%d/%Y") , game: 'Test Game', sharer: 'Sharer', id: 1).shared_email }

      it 'creates the email itself' do
        expect(mail.to).to eq(['test@test.com'])
        expect(mail.body.encoded).to match("Test Game")
        expect(mail.body.encoded).to match("Sharer")
        expect(mail.body.encoded).to match("01/01/2023")
      end
  end

end
