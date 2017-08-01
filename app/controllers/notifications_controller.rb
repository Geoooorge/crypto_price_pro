class NotificationsController < ApplicationController
  before_action :authorize_user

  def authorize_user
    if !user_signed_in?
      redirect_to root_path
    end
  end

  def index
    @user = current_user
    @notifications = User.find(@user.id).notifications
  end

  def new
    @notification = Notification.new
  end

  def create
    @notification = Notification.new(notifications_params)
    @notification.user_id = current_user.id

    if @notification.save
      flash[:notice] = "Notification Saved!"
      redirect_to notifications_path
    else
      flash[:error] = @notification.errors.full_messages.to_sentence
      render action: :new
    end
  end

  def edit
    @notification = Notification.find(params[:id])
  end

  def update
    @notification = Notification.find(params[:id])
    @notification.update_attributes(notifications_params)
    if @notification.save
      flash[:error] = @notification.errors.full_messages.to_sentence
      redirect_to notifications_path
    else
      render action: :edit
    end
  end

  def destroy
    @notification = Notification.find(params[:id])
    @notification.destroy
    flash[:notice] = "Notification successfully deleted"
    redirect_to notifications_path
  end

  private

  def notifications_params
    params.require(:notification).permit(:exchange, :currency_pair, :direction, :notification_type, :target_price, :status)
  end
end
