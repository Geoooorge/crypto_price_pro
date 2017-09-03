require 'rails_helper'

feature "User Signs In" do
  scenario "User view the sign in-page" do
    visit(root_path)
    first(:link, 'Sign In').click

    expect(page).to have_content("Log in")
    expect(page).to have_content("Email")
    expect(page).to have_content("Password")
  end

  scenario "User signs in with valid credentials" do
    user = FactoryGirl.create(:user)
    visit(root_path)
    first(:link, 'Sign In').click
    fill_in("Email", with: user.email)
    fill_in("Password", with: user.password)
    click_button("Log in")

    expect(page).to have_content("Welcome back #{user.first_name}!")
    expect(page).to_not have_content("Sign In")
    expect(page).to_not have_content("Sign Up")
  end

  scenario "User signs in with invalid credentials" do
    visit(root_path)
    first(:link, 'Sign In').click
    fill_in("Email", with: "my_username@example.com")
    fill_in("Password", with: "bad_password")
    click_button("Log in")

    expect(page).to_not have_content("Welcome back")
  end
end
