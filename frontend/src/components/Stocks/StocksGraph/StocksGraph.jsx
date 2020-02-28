import React, {Component} from 'react';
import {LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis} from 'recharts';
// import moment from 'moment';

class StocksGraph extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      data: ''
    }
  }
  
  render() {
    

    return (
      <div>
        {this.props.value && this.props.value.map((elem,index) => {
          const date02 = [...elem];
        return (
          <LineChart
            width={400} height={200} data={date02.reverse()}
            margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
            key={index}
          >
            <CartesianGrid vertical={false} />
    
            <XAxis dataKey="date"
              // label="Date"
            />
            <YAxis
              // dataKey='adjClose'
              domain={['auto', 'auto']}
              // label="Stock Price"
            />
            <Tooltip
              wrapperStyle={{
                borderColor: 'white',
                boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
              }}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              labelStyle={{ fontWeight: 'bold', color: '#666666' }}
            />
            <Line dataKey="adjClose" stroke="#ff7300" dot={false} />
          </LineChart>
        )
        })
  }
      </div>
    );
  }
}

export default StocksGraph;