require 'rails_helper'

feature "User Signs Out" do
  scenario "Authenticated user signs out" do
    user = FactoryGirl.create(:user)
    visit(root_path)
    first(:link, 'Sign In').click
    fill_in("Email", with: user.email)
    fill_in("Password", with: user.password)
    click_button("Log in")
    first(:link, 'Sign Out').click

    expect(page).to have_content("Coin Gazer keeps watch over your digital currency")
    expect(page).to_not have_content("Welcome back #{user.first_name}!")
  end

  scenario "Unauthenticated user attempts to sign out" do
    visit(root_path)

    expect(page).to_not have_content("Sign Out")
  end
end
