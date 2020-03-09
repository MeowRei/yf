import React, {Component} from 'react';
import {LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis} from 'recharts';
import moment from 'moment';
// import classes from './StocksGraph.module.css'

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
  
          if (this.props.period === 'm' &&
            (Object.values(date02[0])[0][8] !== '0' ||
              Object.values(date02[0])[0][9] !== '1')) {
            date02.splice(0,1)
          }
          
          // console.log(Object.values(date02[0])[0][8],Object.values(date02[0])[0][9]);
          // console.log(date02.splice(0,1));
          // console.log(date02);
          date02.map((content, index)=>{
            if (this.props.period === 'm') {
              content['date'] = moment(Object.values(content)[0]).format('MM')
            } else if (this.props.period === 'w') {
              content['date'] = moment(Object.values(content)[0]).format('MM')
            } else {
              content['date'] = moment(Object.values(content)[0]).format('MM-DD')
            }
            }
          );
          return (
          <LineChart
            width={420} height={200} data={date02.reverse()}
            // width={420} height={200} data={date02}
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