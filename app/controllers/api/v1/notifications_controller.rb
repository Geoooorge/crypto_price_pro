class Api::V1::NotificationsController < ApplicationController
  before_action :authorize_user
  skip_before_action :verify_authenticity_token

  def index
    render json: Notification.where(user: current_user)
  end

  def create
    data = JSON.parse(request.body.read)
    if current_user
      new_notification = Notification.create(
        exchange: data["exchange"],
        currency_pair: data["currency_pair"],
        direction: data["direction"],
        notification_type: data["notification_type"],
        target_price: data["target_price"],
        status: 'active',
        notifications_max: data["notifications_max"],
        user_id: current_user.id)
      render json: new_notification
    else
      error = { message: 'You must be logged in to create a new location' }
      render json: error
    end
  end

  def destroy
    @notification = Notification.find(params[:id])
    @notification.destroy
    render json: Notification.where(user: current_user)
  end

  private

  def authorize_user
    if !user_signed_in?
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
