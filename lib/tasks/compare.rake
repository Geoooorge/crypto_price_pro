require 'twilio-ruby'

namespace :notify do
  desc "Compare last price to notification price points"
  task compare: :environment do

    Notification.compare
  end
end
