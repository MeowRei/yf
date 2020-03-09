import React, {Component} from 'react';
import classes from './Analytics.css';
import {
  mean,
  standardDeviation,
  dispersion,
  covariance,
  mmult,
  value1,
  value2,
  value3,
  value4,
} from './fromuls.jsx';

class Analytics extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
      prtf: [
        1, 1, 1, 1,
      ],
    };
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
      source.push(temp);
    }
    
    //--------------------------------------------------------------
    const avg = [];
    const stdev = [];
    const disper = [];
    const vcm = [];
    // const mm = [];
    // const sd = [];
    
    
    source.map(elem => {
      avg.push(mean(elem));
    });
    source.map(elem => {
      stdev.push(standardDeviation(elem));
    });
    source.map(elem => {
      disper.push(dispersion(elem));
    });
    
    if (source.length > 1) {
      for (let i = 0; i < source.length; i++) {
        let task1 = [];
        for (let j = 0; j < source.length; j++) {
          if (j !== i) {
            task1.push(covariance(source[i], source[j]));
          } else {
            task1.push(dispersion(source[i]));
          }
        }
        vcm.push(task1);
      }
    }

    const variant2 = [
      [0.005615179, -0.004727057, 0.001078098, 0.0008552],
      [-0.004727057, 0.041083456, 0.000753167, 0.003287635],
      [0.001078098, 0.000753167, 0.001031119, 0.001278456],
      [0.0008552, 0.003287635, 0.001278456, 0.006159359],
    ];
    
    // if (vcm.length > 1) {
    //   const task1 = (mmult(variant1, variant2));
    //   const task2 = mmult(variant1, task1);
    //   mm.push(Number.parseFloat(task2).toFixed(4));
    //   sd.push(Number.parseFloat(Math.sqrt(task2)).toFixed(4));
    // }
    //--------------------------------------------------------------
    
    //--------------------------------------------------------------
    /*Expected Returns*/
    
    //Set state-----------------------------------
    return {
      ...state, ...{
        source,
        avg,
        stdev,
        disper,
        vcm,
        // mm,
        // sd,
        variant2,
      },
    };
  }
  
  showResult = () => {
    //шаг 1
    
    const tempArr = [1, 0, 0, 0];
    
    if (tempArr.length < this.state.variant2.length) {
      for (let i = tempArr.length; i <
      this.state.variant2.length; i = tempArr.length) {
        tempArr.push(0);
      }
    } else if (tempArr.length > this.state.variant2.length) {
      tempArr.splice(this.state.variant2.length, tempArr.length);
    }
    
    
    //шаг 2
    // работа с переменными
    
    if (this.state.variant2.length > 1) {
      //шаг 2.1
      // c одной переменной
      const one = value1(tempArr, this.state.variant2);
      
      // шаг 2.2
      // c двумя переменными
      const two = value2(tempArr, this.state.variant2);
      
      // шаг 2.3
      // с тремя переменными
      const three = value3(tempArr, this.state.variant2);
      // шаг 2.4
      // с четырьмя переменными
      const four = value4(tempArr, this.state.variant2);
      console.log(three);
    }
  };
  
  render() {
    
    console.log(this.state);
    return (
      <div className={classes.Analytics}>
        <div className="analytic" onClick={this.showResult}>Go!</div>
      </div>
    );
  }
}

export default Analytics;