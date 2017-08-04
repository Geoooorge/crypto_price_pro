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
      exchangeOptions: ['bitstamp', 'gdax', 'gemini'],
      exchangeSelected: 'bitstamp',
      currencyOptions: ['btcusd', 'ethusd'],
      currencySelected: 'btcusd',
      directionOptions: ['above', 'below'],
      directionSelected: 'above',
      notifyTypeOptions: ['email', 'text'],
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
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {
      exchange: this.state.exchangeSelected,
      currency_pair: this.state.currencySelected,
      direction: this.state.directionSelected,
      notification_type: this.state.notifyTypeSelected,
      target_price: this.state.price,
      notifications_max: this.state.notifyMaxSelected
    }
    this.props.addNewNotification(formPayload);
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

    return(
      <form className="new-notification-form" onSubmit={this.handleFormSubmit}>
        <ExchangeSelect
          handlerFunction={this.handleExchangeSelection}
          name='exchange'
          label='Exchange'
          options={this.state.exchangeOptions}
          selectedOption={this.state.exchangeSelected}
        />
        <CurrencySelect
          handlerFunction={this.handleCurrencySelection}
          name='currency'
          label='Currency'
          options={this.state.currencyOptions}
          selectedOption={this.state.currencySelected}
        />
        <DirectionSelect
          handlerFunction={this.handleDirectionSelection}
          name='direction'
          label='Direction'
          options={this.state.directionOptions}
          selectedOption={this.state.directionSelected}
        />
        <NotifyTypeSelect
          handlerFunction={this.handleNotifyTypeSelection}
          name='type'
          label='Type'
          options={this.state.notifyTypeOptions}
          selectedOption={this.state.notifyTypeSelected}
        />
        <PriceText
          content={this.state.price}
          name='price'
          label="Price"
          handlerFunction={this.handlePriceChange}
        />
        <NotifyMaxSelect
          handlerFunction={this.handleMaxChange}
          name='max-notifications'
          label="Max Notifications"
          options={this.state.notifyMaxOptions}
          content={this.state.notifyMaxSelected}
        />

        <div className="button-group">
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>

    );
  }
}

export default NotificationsFormContainer;
