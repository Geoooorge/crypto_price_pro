import React from 'react';
import {Bar, Line} from 'react-chartjs-2';

class ChartTile extends React.Component {

  render() {

    let chartData = {
      labels: ["","","","","","","","","","","","","","","","","","","",""],
      datasets:[
        {
          label: 'Bitcoin (Bitstamp)',
          data: this.props.chartPrice,
          backgroundColor:[
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
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
