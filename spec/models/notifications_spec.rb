require 'rails_helper'

RSpec.describe Notification, type: :model do
  it { should have_valid(:exchange).when('coinbase', 'bitstamp', 'gdax') }
  it { should_not have_valid(:exchange).when('', nil) }

  it { should have_valid(:currency_pair).when('btcusd', 'ethusd', 'ltcusd') }
  it { should_not have_valid(:currency_pair).when('', nil) }

  it { should have_valid(:direction).when('above', 'below') }
  it { should_not have_valid(:direction).when('', nil) }

  it { should have_valid(:notification_type).when('text', 'email') }
  it { should_not have_valid(:notification_type).when('', nil) }

  it { should have_valid(:status).when('active', 'paused') }
  it { should_not have_valid(:status).when('', nil) }
end
