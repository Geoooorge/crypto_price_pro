require 'rails_helper'

feature 'user deletes profile' do
  let!(:user) { FactoryGirl.create(:user) }

  before(:each) do
    visit(root_path)
    first(:link, 'Sign In').click
    fill_in("Email", with: user.email)
    fill_in("Password", with: user.password)
    click_button("Log in")
    first(:link, 'My Account').click
  end

  scenario 'User successfully deletes profile' do
    click_button 'Cancel my account'

    expect(page).to have_content('Coin Gazer keeps watch over your digital currency')
    expect(User.exists?(user.id)).to_not eq(true)
  end
end
