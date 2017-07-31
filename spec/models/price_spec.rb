require 'rails_helper'

RSpec.describe Price, type: :model do
  it { should have_valid(:last).when(1215.77, 2788.55, 8888.99) }
  it { should_not have_valid(:last).when('johhny', 'n') }
  it { should_not have_valid(:last).when('', nil) }

  it { should have_valid(:exchange).when('bitstamp', 'coinbase') }
  it { should_not have_valid(:exchange).when('', nil) }

  it { should have_valid(:currency_pair).when('btcusd', 'ethusd') }
  it { should_not have_valid(:currency_pair).when('', nil) }
end
