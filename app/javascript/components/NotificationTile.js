import React from 'react';

const NotificationTile = (props) => {
  return (
    <div className="notification-tile">
      <li>{props.id} - {props.userId} - {props.exchange} - {props.currencyPair} - {props.notificationType} - {props.direction} - {props.targetPrice} - {props.notificationsSent} - {props.notificationsMax} - {props.status} - <a href={"/notifications/" + props.id + "/edit"}>Edit</a></li>
    </div>
  )
}

export default NotificationTile;
