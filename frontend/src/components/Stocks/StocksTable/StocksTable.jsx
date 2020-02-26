import React, {Component} from 'react';
import moment from 'moment';
import classes from './StocksTable.module.css';
import StocksGraph from '../StocksGraph/StocksGraph';

class StocksTable extends Component {
  
  Difference = (array, index) => {
    if ((array.length - 1) === index) {
      return '-';
    } else {
      const res = Number.parseFloat(
        array[index].adjClose - array[index + 1].adjClose).toFixed(2);
      return res;
    }
  };
  
  render() {
    
    let differ = [classes.textDate];
    
    function differColor(res) {
      differ = [classes.textDate];
      const x = +res;
      if (x > 0) {
        differ.push(classes.green);
      } else if (x < 0) {
        differ.push(classes.red);
      }
    }
    
    return (
      <div>
        <div className={classes.table}>
          
          <div className={classes.title}>
            {/*<div>Date</div>*/}
            {this.props.name.map((elem, index) => {
              return (<div key={index}>{elem}</div>);
            })}
          </div>
          <div className={classes.content}>
            
            {/*<div className={classes.date}>*/}
            {/*  {this.props.value[0].map((elem,index)=>{*/}
            {/*    return(*/}
            {/*      <div key={index}>{moment(elem.date).format('YYYY-MM-DD')}</div>*/}
            {/*    )*/}
            {/*  })}*/}
            {/*  </div>*/}
            
            <div className={classes.adjCloseCol}>
              {this.props.value.map((elem, index1) => {
                return (
                  <div key={index1} className={classes.adjClose}>
                    {elem.map((content, index2, array) => {
                      return (
                        <div key={index2} className={classes.dataCell}>
                          <div className={classes.textDate}>
                            {moment(content.date).format('YYYY-MM-DD')}
                          </div>
                          <div>
                            {Number.parseFloat(content.adjClose).toFixed(2)}
                            {differColor(this.Difference(array, index2))}
                          </div>
                          <div className={differ.join(' ')}>
                            {this.Difference(array, index2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
        <StocksGraph value={this.props.value} name={this.props.name}/>
        </div>
      </div>
    );
  }
}

export default StocksTable;