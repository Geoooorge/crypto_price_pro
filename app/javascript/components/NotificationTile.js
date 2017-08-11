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
          <tr>
          <td>{this.props.exchange}</td>
          <td>{this.props.currencyPair}</td>
          <td>{this.props.notificationType}</td>
          <td>{this.props.direction}</td>
          <td>${parseFloat(Math.round(this.props.targetPrice * 100) / 100).toFixed(2)}</td>
          <td>{this.props.notificationsSent}</td>
          <td>{this.props.notificationsMax}</td>
          <td>{this.props.status}</td>
          <td><button onClick={this.handleDelete} className="btn waves-effect red darken-4">Delete</button></td>
        </tr>
    )
  }
}

export default NotificationTile;
