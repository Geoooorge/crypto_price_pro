import React from 'react';

class NotificationTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(event) {
    event.preventDefault();
    let formPayload = {
      d_id: this.state.id
    }
    this.props.deleteNotification(formPayload)
  }

  render() {

    return (
      <div className="notification-tile">
        <li>{this.props.id} - {this.props.userId} - {this.props.exchange} - {this.props.currencyPair} - {this.props.notificationType} - {this.props.direction} - {this.props.targetPrice} - {this.props.notificationsSent} - {this.props.notificationsMax} - {this.props.status} -  <i onClick={this.handleDelete} className="material-icons">delete</i></li>
      </div>
    )
  }
}

export default NotificationTile;
