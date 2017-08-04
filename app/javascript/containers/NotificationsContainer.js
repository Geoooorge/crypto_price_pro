import React from 'react';
import NotificationTile from '../components/NotificationTile'
import NotificationsFormContainer from './NotificationsFormContainer'

class NotificationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: []
    }
    this.addNewNotification = this.addNewNotification.bind(this);
  }
  componentDidMount() {
    fetch('/api/v1/notifications', {
      credentials: "same-origin"
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let notifications = body;
        this.setState({
          notifications: notifications
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewNotification(formPayload) {
    fetch('/api/v1/notifications', {
      method: 'POST',
      credentials: "same-origin",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formPayload)
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ notifications: [...this.state.notifications, responseData] })
    })
  }

  render() {
    console.log(this.state.notifications)
    let notifications = this.state.notifications.map(notification => {
      return(
        <NotificationTile
          key={notification.id}
          id={notification.id}
          exchange={notification.exchange}
          currencyPair={notification.currency_pair}
          notificationType={notification.notification_type}
          direction={notification.direction}
          targetPrice={notification.target_price}
          notificationsSent={notification.notifications_sent}
          notificationsMax={notification.notifications_max}
          userId={notification.user_id}
          status={notification.status}
        />
      )
    })

    return(
    <div>
      <NotificationsFormContainer addNewNotification={this.addNewNotification}
      />
      {notifications}
    </div>

    );
  }
}

export default NotificationsContainer;
