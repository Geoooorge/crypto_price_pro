import React from 'react';

const CurrencySelect = (props) => {
  let optionElements = props.options.map(option => {
    return (
      <option key={option} value={option}>{option}</option>
    )
  })

  return (
    <label>{props.label}
    <select className="browser-default" name={props.name} value={props.selectedOption} onChange={props.handlerFunction}>
      <option value="">Choose Currency</option>
      {optionElements}
    </select>
  </label>
  )
}

export default CurrencySelect;
