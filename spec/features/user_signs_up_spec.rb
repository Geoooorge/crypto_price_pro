require 'rails_helper'

feature "User Signs Ups" do
  scenario "Unauthenticated user can view sign up form" do
    visit(root_path)
    first(:link, 'Sign Up').click

    expect(page).to have_content("Sign up")
    expect(page).to have_content("First Name")
    expect(page).to have_content("Last Name")
    expect(page).to have_content("Username")
    expect(page).to have_content("Email")
    expect(page).to have_content("Password")
    expect(page).to have_content("Password confirmation")
  end

  scenario "User fills in form succesfully" do
    visit(root_path)
    first(:link, 'Sign Up').click
    fill_in("First Name", with: "James")
    fill_in("Last Name", with: "Bond")
    fill_in("Username", with: "user@gmail.com")
    fill_in("Email", with: "user@gmail.com")
    fill_in("Password", with: "password")
    fill_in("Password confirmation", with: "password")
    click_button("Sign up")

    expect(page).to have_content("Welcome back James!")
  end

  scenario "User does not provide all information" do
    visit(root_path)
    first(:link, 'Sign Up').click
    fill_in("First Name", with: "James")
    fill_in("Last Name", with: "Bond")
    fill_in("Email", with: "user@gmail.com")
    fill_in("Password", with: "password")
    fill_in("Password confirmation", with: "password")
    click_button("Sign up")

    expect(page).to have_content("error")
    expect(page).to have_content("Username can't be blank")
    expect(page).to_not have_content("Welcome back James!")
  end

  scenario "User confirmation does not match" do
    visit(root_path)
    first(:link, 'Sign Up').click
    fill_in("First Name", with: "James")
    fill_in("Last Name", with: "Bond")
    fill_in("Username", with: "user@gmail.com")
    fill_in("Email", with: "user@gmail.com")
    fill_in("Password", with: "password")
    fill_in("Password confirmation", with: "password1")
    click_button("Sign up")

    expect(page).to have_content("error")
    expect(page).to have_content("Password confirmation doesn't match Password")
    expect(page).to_not have_content("Welcome back James!")
  end
end
