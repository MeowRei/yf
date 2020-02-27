import React, {Component} from 'react';
import moment from 'moment';
import classes from './Stocks.module.css';
import StocksTable from './StocksTable/StocksTable';

class Stocks extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: '',
      value: '',
      symbol: {
        symbol1: '',
        symbol2: '',
        symbol3: '',
        symbol4: '',
      },
      from: '',
      to: '',
      period: '',
    };
  }
  
  componentDidMount = () => {
    this.setState({
      from: moment().subtract(1, 'years').format('YYYY-MM-DD'),
      to: moment().format('YYYY-MM-DD'),
      period: 'm',
    });
  };
  
  getStocksInfo = async () => {
    const response = await fetch('/symbol', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {
          symbol: this.state.symbol,
          from: this.state.from,
          to: this.state.to,
          period: this.state.period,
        },
      ),
    });
    
    const data = await response.json();
    this.setState({
      data,
    });
  };
  
  getSymbol = (e) => {
    const data = this.state.symbol;
    const name = e.target.name;
    data[name] = e.target.value;
    this.setState({symbol: data});
  };
  
  setFromDate = (e) => {
    this.setState({
      from: e.target.value,
    });
  };
  setToDate = (e) => {
    this.setState({
      to: e.target.value,
    });
  };
  
  setPeriod = (e) => {
    e.target.value === 'Day' ?
      this.setState({period: 'd'}) :
      e.target.value === 'Week' ?
        this.setState({period: 'w'}) :
        e.target.value === 'Month' ?
          this.setState({period: 'm'}) :
          this.setState({period: 'd'});
  };
  
  onClear = () => {
    this.setState({
      data: '',
      symbol: {
        symbol1: '',
        symbol2: '',
        symbol3: '',
        symbol4: '',
      }
    });
  };
  
  
  
  render() {
    return (
      <div>
        <div>
          <div className={classes.Symbol}>
            <input
              type="text"
              name={'symbol1'}
              value={this.state.symbol.symbol1}
              placeholder="Enter stocks name 1"
              onChange={this.getSymbol}
            />
            
            <input
              type="text"
              name={'symbol2'}
              value={this.state.symbol.symbol2}
              placeholder="Enter stocks name 2"
              onChange={this.getSymbol}
            />
  
            <input
              type="text"
              name={'symbol3'}
              value={this.state.symbol.symbol3}
              placeholder="Enter stocks name 3"
              onChange={this.getSymbol}
            />
            
            <input
              type="text"
              name={'symbol4'}
              value={this.state.symbol.symbol4}
              placeholder="Enter stocks name 4"
              onChange={this.getSymbol}
            />
            <button onClick={this.onClear}>Clear</button>
          
          </div>
          <br/>
          <div className={classes.Params}>
            <input value={this.state.from} onChange={this.setFromDate}
                   type="date"/>
            <input value={this.state.to} onChange={this.setToDate} type="date"/>
            
            <select onChange={this.setPeriod} name="type">
              <option>Month</option>
              <option>Week</option>
              <option>Day</option>
            </select>
            
            <button onClick={this.getStocksInfo}>Request</button>
            
          </div>
        </div>
        
        <div>
          {this.state.data ? <StocksTable
            name={Object.keys(this.state.data)}
            value={Object.values(this.state.data)}
          /> : null}
        </div>
      </div>);
  }
}

export default Stocks;