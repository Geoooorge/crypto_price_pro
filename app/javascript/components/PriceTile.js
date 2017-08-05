import React from 'react';

const PriceTile = (props) => {
  return (
    <li>{props.id} - {props.exchange} - {props.price} - {props.currency} - {props.time}</li>
  )
}

export default PriceTile;
