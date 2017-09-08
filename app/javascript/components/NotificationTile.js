import React from 'react';

class NotificationTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      status: this.props.status
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
  }

  handleDelete(event) {
    event.preventDefault();
    let formPayload = {
      d_id: this.state.id
    }
    this.props.deleteNotification(formPayload)
  }

  handleStatusUpdate(event) {
    event.preventDefault();
    let status;
    if (this.state.status === 'active') {
      status = 'inactive';
      this.setState({status: 'inactive'})
    }
    else {
      status = 'active';
      this.setState({status: 'active'})
    }

    let formPayload = {
      id: this.state.id,
      status: status
    }
    this.props.updateNotification(formPayload);
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
          <td><button onClick={this.handleStatusUpdate} className="btn waves-effect">{this.state.status}</button></td>
          <td><button onClick={this.handleDelete} className="btn waves-effect red darken-4">Delete</button></td>
        </tr>
    )
  }
}

export default NotificationTile;
