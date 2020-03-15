import React, {Component} from 'react';
import moment from 'moment';
import classes from './Stocks.module.css';
import StocksTable from './StocksTable/StocksTable';
import StocksGraph from './StocksGraph/StocksGraph';
import Analytics from './Analytics/Analytics';

class Stocks extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: '',
      value: '',
      fieldsCount: 4,
      symbol: {
        symbol1: '',
        symbol2: '',
        symbol3: '',
        symbol4: '',
        symbol5: '',
        symbol6: '',
        symbol7: '',
        symbol8: '',
        symbol9: '',
      },
      from: '',
      to: '',
      period: '',
      risk: 0,
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
    
    this.getRisk()
    
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
        symbol5: '',
        symbol6: '',
        symbol7: '',
        symbol8: '',
        symbol9: '',
      },
    });
  };
  
  delDate = (dateId) => {
    const data = this.state.data;
    Object.values(data).map(elem =>
      elem.splice(dateId, 1),
    );
    this.setState({
      data,
    });
  };
  
  addInputStock = () => {
    if (this.state.fieldsCount < 8) {
    this.setState({
      fieldsCount: this.state.fieldsCount + 1,
    });
    }
  };
  
  delInputStock = () => {
    if (this.state.fieldsCount > 1) {
      this.setState({
        fieldsCount: this.state.fieldsCount - 1,
      });
    }
  };
  
  getRisk = async () => {
    const response = await fetch('/risk');
    const {risk} = await response.json();
    this.setState({
      risk
    })
    
  };
  
  render() {
    
    const fields = [];
    
    for (let i = 0; i < this.state.fieldsCount; i++) {
      fields.push(<input
        key={i}
        type="text"
        name={`symbol${i + 1}`}
        value={Object.values(this.state.symbol)[i]}
        placeholder="Enter stocks name"
        onChange={this.getSymbol}
      />);
    }
    // console.log(this.state);
    return (
      <div>
        <div>
          <div className={classes.Symbol}>
            <div>
              {fields}
            </div>
            <div>
            <button onClick={this.addInputStock}>+</button>
            <button onClick={this.delInputStock}>-</button>
            <button onClick={this.onClear}>Clear</button>
            </div>
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
          {this.state.data && this.state.risk ?
            <div className={classes.DetailsAndGraph}>
              <div className={classes.BlockInfo}>
                <StocksTable
                  name={Object.keys(this.state.data)}
                  value={Object.values(this.state.data)}
                  delDate={this.delDate}
                  period={this.state.period}
                />
                <StocksGraph
                  name={Object.keys(this.state.data)}
                  value={Object.values(this.state.data)}
                  period={this.state.period}
                />
              </div>
              <div>
                <Analytics
                  name={Object.keys(this.state.data)}
                  value={Object.values(this.state.data)}
                  risk={this.state.risk}
                /></div>
            </div>
            : null}
        
        </div>
      </div>);
  }
}

export default Stocks;