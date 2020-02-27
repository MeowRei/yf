import React, {Component} from 'react';
import classes from './StocksGraph.module.css';

class StocksGraph extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  static getDerivedStateFromProps(props, state) {
    
    //source data--------------------------------
    const source = [];
    const temp = [];
    if (props.value.length > 1) {
      props.value.map((elem, index) => {
        source.push(elem.map((content, index, array) => {
          if (array.length - 1 !== index) {
            return array[index].adjClose / array[index + 1].adjClose - 1;
          }
        }));
        source[index].pop();
      });
    } else {
      props.value[0].map((elem, index, array) => {
        if (array.length - 1 !== index) {
          temp.push(array[index].adjClose / array[index + 1].adjClose - 1);
        }
      });
      source.push(temp)
    }
    //------------------------------------------
    
    /*Mkt Prtf*/
    // Ось Х---------------------------------------------
    function standardDeviation(arr) {
      const task1 = arr.reduce((sum, elem) => sum + elem) / arr.length; // 1
      const task2 = arr.map(elem => elem - task1); //2
      const task3 = task2.map(elem => elem * elem); //3
      const task4 = task3.reduce((sum, elem) => sum + elem); //4
      const task5 = task4 / (arr.length - 1); //5
      const task6 = Math.sqrt(task5);
      return task6;
    }
    // Ось У--------------------------------------------
    function mean(arr) {
      const task1 = arr.reduce((sum, elem) => sum + elem) / arr.length;
      return task1
    }
    /*END*/
    const avg =[];
    const stdev = [];
    
    // console.log(source);
    if (source.length > 1) {
       source.map(elem=>{
         avg.push(mean(elem))
      });
      source.map(elem=>{
        stdev.push(standardDeviation(elem))
      });
    } else {
     avg.push(mean(source[0]));
     stdev.push(standardDeviation(source[0]));
    }
    
    /*Expected Returns*/
    
    //Set state-----------------------------------
    return {
      ...state, ...{source: source, avg: avg, stdev: stdev},
    };
  }
  
  componentDidMount() {
  
  }
  
  render() {
    
    // console.log(this.state);
    return (
      <div className={classes.StocksGraph}>
      
      </div>
    );
  }
}

export default StocksGraph;