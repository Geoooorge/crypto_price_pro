import React from 'react';
import NotificationTile from '../components/NotificationTile'
import NotificationsFormContainer from './NotificationsFormContainer'
import PriceTile from '../components/PriceTile'
import ChartTile from '../components/ChartTile'

class NotificationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      prices: [],
      chartPrice: [],
      chartDate: []
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

      fetch('/api/v1/prices')
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
            let prices = body;
            let chartPrice = prices.map(price => {
              return(
                parseFloat(price.last)
              )
            });
            let chartDate = prices.map(price => {
              return(
                price.created_at
              )
            })
            this.setState({
              prices: prices,
              chartPrice: chartPrice,
              chartDate: chartDate
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

    let prices = this.state.prices.map(price => {
      return(
        <PriceTile
          key={price.id}
          id={price.id}
          price={price.last}
          currency={price.currency_pair}
          time={price.created_at}
          exchange={price.exchange}
        />
      )
    })



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
      <ChartTile
        chartPrice={this.state.chartPrice}
        chartDate={this.state.chartDate}
      />
      <NotificationsFormContainer addNewNotification={this.addNewNotification}
      />
      <div className="row">
        <div className="col s12 l4">
          {prices}
        </div>
        <div className="col s12 l8">
          {notifications}
        </div>
      </div>
    </div>
    );
  }
}

export default NotificationsContainer;