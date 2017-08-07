import React from 'react';
import {Bar, Line} from 'react-chartjs-2';

class ChartTile extends React.Component {

  render() {

    let chartData = {
      labels: this.props.chartDate,
      datasets:[
        {
          label: 'Bitcoin (Bitstamp)',
          data: this.props.chartBitstampBtc,
          backgroundColor:[
            'rgba(247, 7, 7, 0.2)'
          ]
        },
        {
          label: 'Ethereum (Coinbase)',
          data: this.props.chartCoinbaseEth,
          backgroundColor:[
            'rgba(12, 142, 37, 0.2)'
          ]
        },
        {
          label: 'Bitcoin (Bitfinex)',
          data: this.props.chartBitfinexBtc,
          backgroundColor:[
            'rgba(24, 15, 191, 0.2)'
          ]
        },
        {
          label: 'Bitcoin (Coinbase)',
          data: this.props.chartCoinbaseBtc,
          backgroundColor:[
            'rgba(249, 240, 45, 0.2)'
          ]
        }
      ]
    }

    return(
      <div className="chart">
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default ChartTile;
