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
      chartBitstampBtc: [],
      chartCoinbaseBtc: [],
      chartBitfinexBtc: [],
      chartDate: [],
      priceStream: []
    }
    this.addNewNotification = this.addNewNotification.bind(this);
    this.deleteNotification = this.deleteNotification.bind(this);
    this.priceStreamUpdate = this.priceStreamUpdate.bind(this);
    this.priceChartUpdate = this.priceChartUpdate.bind(this);
  }

  priceStreamUpdate() {
    fetch('/api/v1/prices/chart_stream')
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
        let priceStream = body;
        this.setState({
          priceStream: priceStream
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  priceChartUpdate() {
    fetch('/api/v1/prices/chart_prices')
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
          let chartBitstampBtc = prices.filter(price => {
            return(
              price.exchange === 'bitstamp' && price.currency_pair === 'btcusd'
            )
            }).map(price => {
              return(
                parseFloat(price.last)
              )
          });
          let chartBitfinexBtc = prices.filter(price => {
            return(
              price.exchange === 'bitfinex' && price.currency_pair === 'btcusd'
            )
            }).map(price => {
              return(
                parseFloat(price.last)
              )
          });
          let chartCoinbaseBtc = prices.filter(price => {
            return(
              price.exchange === 'coinbase' && price.currency_pair === 'btcusd'
            )
            }).map(price => {
              return(
                parseFloat(price.last)
              )
          });
          let chartDate = prices.filter(price => {
            return(
              price.exchange === 'bitstamp' && price.currency_pair === 'btcusd'
            )
          }).map(price => {
            return(
              ""
            )
          });
          this.setState({
            prices: prices,
            chartBitstampBtc: chartBitstampBtc,
            chartBitfinexBtc: chartBitfinexBtc,
            chartCoinbaseBtc: chartCoinbaseBtc,
            chartDate: chartDate
          });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  componentDidMount() {
    fetch('/api/v1/notifications/', {
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

          this.priceChartUpdate();
          this.priceStreamUpdate();
          this.priceStreamRefresh = setInterval(this.priceStreamUpdate, 1000);
          this.priceChartRefresh = setInterval(this.priceChartUpdate, 1000);

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

  deleteNotification(formPayload) {
    let delete_id = formPayload.d_id
    fetch(`/api/v1/notifications/${delete_id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
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


  render() {

    let prices = this.state.priceStream.map(price => {
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
          deleteNotification={this.deleteNotification}
        />
      )
    })

    return(
    <div>
      <ChartTile
        chartBitstampBtc={this.state.chartBitstampBtc}
        chartBitfinexBtc={this.state.chartBitfinexBtc}
        chartCoinbaseBtc={this.state.chartCoinbaseBtc}
        chartDate={this.state.chartDate}
      />
      <NotificationsFormContainer
        addNewNotification={this.addNewNotification}
        options={options}
      />
      <div className="row">
        <div className="col s12 l4">
          <ul className="collection with-header">
            <li className="collection-header"><h4>Latest Prices</h4></li>
            {prices.reverse()}
          </ul>
        </div>
        <div className="col s12 l8">
          <table>
            <thead>
              <tr>
                  <th>Exchange</th>
                  <th>Curency Pair</th>
                  <th>Notification Type</th>
                  <th>Direction</th>
                  <th>Target Price</th>
                  <th>Notifications Sent</th>
                  <th>Max Notifications</th>
                  <th>Status</th>
                  <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {notifications}
            </tbody>
        </table>
        </div>
      </div>
    </div>
    );
  }
}

const options = {
  "bitstamp": ["btcusd", "ltcusd"],
  "coinbase": ["btcusd", "ethusd"],
  "bitfinex": ["btcusd", "ethusd", "ltcusd"]
}

export default NotificationsContainer;
