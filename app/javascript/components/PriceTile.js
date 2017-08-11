import React from 'react';

const PriceTile = (props) => {

  return (
    <li className="collection-item avatar">
      <i className="material-icons circle">account_balance_wallet</i>
      <span className="">{props.currency.toUpperCase()} ({props.exchange.toUpperCase()})</span>
      <p>${parseFloat(Math.round(props.price * 100) / 100).toFixed(2)}</p></li>
  )
}

export default PriceTile;
