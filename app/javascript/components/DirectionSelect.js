import React from 'react';

const DirectionSelect = (props) => {
  let optionElements = props.options.map(option => {
    return (
      <option key={option} value={option}>{option}</option>
    )
  })

  return (
    <label>{props.label}
    <select className="browser-default" name={props.name} value={props.selectedOption} onChange={props.handlerFunction}>
      {optionElements}
    </select>
  </label>
  )
}

export default DirectionSelect;
