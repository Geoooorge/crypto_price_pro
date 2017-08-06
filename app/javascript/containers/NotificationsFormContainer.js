import React from 'react';
import ExchangeSelect from '../components/ExchangeSelect'
import CurrencySelect from '../components/CurrencySelect'
import DirectionSelect from '../components/DirectionSelect'
import NotifyTypeSelect from '../components/NotifyTypeSelect'
import PriceText from '../components/PriceText'
import NotifyMaxSelect from '../components/NotifyMaxSelect'

class NotificationsFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstLevel: Object.keys(props.options)[0],
      secondLevel: '',
      currencySelected: '',
      directionOptions: ['above', 'below'],
      directionSelected: 'above',
      notifyTypeOptions: ['text','email'],
      notifyTypeSelected: 'text',
      price: '',
      notifyMaxOptions: [1, 2, 3, 4, 5],
      notifyMaxSelected: 1
    }
    this.handleExchangeSelection = this.handleExchangeSelection.bind(this);
    this.handleCurrencySelection = this.handleCurrencySelection.bind(this);
    this.handleDirectionSelection = this.handleDirectionSelection.bind(this);
    this.handleNotifyTypeSelection = this.handleNotifyTypeSelection.bind(this);
    this.handleMaxChange = this.handleMaxChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFirstLevelChange = this.handleFirstLevelChange.bind(this)
    this.handleSecondLevelChange = this.handleSecondLevelChange.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {
      exchange: this.state.firstLevel,
      currency_pair: this.state.secondLevel,
      direction: this.state.directionSelected,
      notification_type: this.state.notifyTypeSelected,
      target_price: this.state.price,
      notifications_max: this.state.notifyMaxSelected
    }
    this.props.addNewNotification(formPayload);
  }

  handleFirstLevelChange(event) {
   this.setState({firstLevel: event.target.value});
  }

  handleSecondLevelChange(event) {
     this.setState({secondLevel: event.target.value });
  }

  handleExchangeSelection(event) {
    this.setState({ exchangeSelected: event.target.value })
  }

  handleCurrencySelection(event) {
    this.setState({ currencySelected: event.target.value })
  }

  handleDirectionSelection(event) {
    this.setState({ directionSelected: event.target.value })
  }

  handleNotifyTypeSelection(event) {
    this.setState({ notifyTypeSelected: event.target.value })
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value })
  }

  handleMaxChange(event) {
    this.setState({ notifyMaxSelected: event.target.value })
  }

  render() {

    let firstLevelOptions = Object.keys(this.props.options)
    let secondLevelOptions = this.props.options[this.state.firstLevel]

    return(
    <div className="row">
      <form className="new-notification-form col s12" onSubmit={this.handleFormSubmit}>
        <div className="row">

          <div className="col s12 l2 m6">
            <ExchangeSelect
              handlerFunction={this.handleFirstLevelChange}
              name='exchange'
              label='Exchange'
              options={firstLevelOptions}
              selectedOption={this.state.firstLevel}
            />
          </div>

          <div className="col s12 l2 m6">
            <CurrencySelect
              handlerFunction={this.handleSecondLevelChange}
              name='currency-pair'
              label='Currency Pair'
              options={secondLevelOptions}
              selectedOption={this.state.secondLevel}
            />
          </div>


          <div className="col s12 l2 m6">
            <DirectionSelect
              handlerFunction={this.handleDirectionSelection}
              name='direction'
              label='Direction'
              options={this.state.directionOptions}
              selectedOption={this.state.directionSelected}
            />
          </div>
          <div className="col s12 l2 m6">
            <PriceText
              content={this.state.price}
              name='price'
              label="Price"
              handlerFunction={this.handlePriceChange}
            />
          </div>
          <div className="col s12 l2 m6">
            <NotifyTypeSelect
              handlerFunction={this.handleNotifyTypeSelection}
              name='alert-type'
              label='Alert Type'
              options={this.state.notifyTypeOptions}
              selectedOption={this.state.notifyTypeSelected}
            />
          </div>
          <div className="col s12 l2 m6">
            <NotifyMaxSelect
              handlerFunction={this.handleMaxChange}
              name='max-notifications'
              label="Max Notifications"
              options={this.state.notifyMaxOptions}
              content={this.state.notifyMaxSelected}
            />
          </div>
          <div className="button-group">
            <input className="waves-effect waves-light btn" type="submit" value="Add Alert" />
          </div>
        </div>
      </form>
    </div>
    );
  }
}

export default NotificationsFormContainer;
