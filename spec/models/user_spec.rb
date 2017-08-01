require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:first_name).when('Marty', 'John', 'Bill') }
  it { should_not have_valid(:first_name).when('', nil) }

  it { should have_valid(:last_name).when('Marty', 'John', 'Bill') }
  it { should_not have_valid(:last_name).when('', nil) }

  it { should have_valid(:username).when('friendly', 'yaya', 'user1234') }
  it { should_not have_valid(:username).when('', nil) }

  it { should have_valid(:phone).when('1234567890', '5085555555', '2128885555', '', nil) }
  it { should_not have_valid(:phone).when('555', 'dddd') }

  it { should have_valid(:email).when('john@gmail.com', 'bill@gmail.com') }
  it { should_not have_valid(:email).when('', nil, 'go.com') }

  it 'has a matching password confirmation for the password' do
    user = User.new
    user.password = 'password'
    user.password_confirmation = 'another'

    expect(user).to_not be_valid
    expect(user.errors[:password_confirmation]).to_not be_blank
  end
end
