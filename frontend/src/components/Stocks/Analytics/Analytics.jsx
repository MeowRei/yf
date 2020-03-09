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
  value31,
  value32,
  value33,
} from './fromuls.jsx';

class Analytics extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sdE: 0,
      sdM: 0,
      sdH: 0,
      sdHtest:[],
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
      // [0.0008552, 0.003287635, 0.001278456, 0.006159359],
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
  
  showResultE = () => {
    //шаг 1
    
    const tempArr = [1, 0, 0, 0];
    
    if (tempArr.length < this.state.vcm.length) {
      for (let i = tempArr.length; i <
      this.state.vcm.length; i = tempArr.length) {
        tempArr.push(0);
      }
    } else if (tempArr.length > this.state.vcm.length) {
      tempArr.splice(this.state.vcm.length, tempArr.length);
    }
    
    const one = value1(tempArr, this.state.vcm);
    this.setState({
      sdE: one,
    });
    
  };
  
  showResultM = () => {
    const tempArr = [1, 0, 0, 0];
    
    if (tempArr.length < this.state.vcm.length) {
      for (let i = tempArr.length; i <
      this.state.vcm.length; i = tempArr.length) {
        tempArr.push(0);
      }
    } else if (tempArr.length > this.state.vcm.length) {
      tempArr.splice(this.state.vcm.length, tempArr.length);
    }
    const two = value2(tempArr, this.state.vcm);
    this.setState({
      sdM: two,
    });
  };
  
  showResultH = () => {
    const three1 = value31(this.state.vcm);
    const three2 = value32(this.state.vcm);
    const three3 = value33(this.state.vcm);
    
    function min(arr1, arr2, arr3) {
      const all = [arr1, arr2, arr3];
      const allMinSd = [arr1[0].sd, arr2[0].sd, arr3[0].sd];
      const iMin = allMinSd.indexOf(
        Math.min(arr1[0].sd, arr2[0].sd, arr3[0].sd));
      return all[iMin];
    }
    
    function max(arr1, arr2, arr3) {
      const all = [arr1, arr2, arr3];
      const allMinSd = [arr1[1].sd, arr2[1].sd, arr3[1].sd];
      const iMax = allMinSd.indexOf(
        Math.max(arr1[1].sd, arr2[1].sd, arr3[1].sd));
      return all[iMax];
    }
    
    const threeMin = min(three1, three2, three3);
    const threeMax = max(three1, three2, three3);
    
    this.setState({
      sdH: [threeMin[0], threeMax[1]],
      sdHtest: [three1,three2,three3]
    });
    
  };
  
  render() {
    // console.log(this.props);
    // console.log(this.state);
    return (
      <div className={classes.Analytics}>
        {/*<div>*/}
        {/*  <div className="analytic" onClick={this.showResultE}>Analytics Easy!*/}
        {/*  </div>*/}
        {/*  <div>Min: {this.state.sdE !== 0 ? <p>{this.state.sdE[0].sd}</p> : this.state.sdE}</div>*/}
        {/*  <div>Max: {this.state.sdE !== 0 ? <p>{this.state.sdE[1].sd}</p> : this.state.sdE}</div>*/}
        {/*  <div>Buy {this.props.name[0]}: {this.state.sdE !== 0 ? <p>{this.state.sdE[0].prtf[0]}</p> : this.state.sdE} </div>*/}
        {/*  <div>Buy {this.props.name[1]}: {this.state.sdE !== 0 ? <p>{this.state.sdE[0].prtf[1]}</p> : this.state.sdE} </div>*/}
        {/*  <div>Buy {this.props.name[2]}: {this.state.sdE !== 0 ? <p>{this.state.sdE[0].prtf[2]}</p> : this.state.sdE} </div>*/}
        {/*</div>*/}
        <hr/>
  
        <div>
          <div className="analytic" onClick={this.showResultM}>Analytics
            Medium! (click me)
          </div>
          <div>Min: {this.state.sdM !== 0 ? this.state.sdM[0].sd : this.state.sdM}</div>
          <div>Max: {this.state.sdM !== 0 ? this.state.sdM[1].sd : this.state.sdM}</div>
          <div>Buy {this.props.name[0]}: {this.state.sdM !== 0 ? this.state.sdM[0].prtf[0] : this.state.sdM} </div>
          <div>Buy {this.props.name[1]}: {this.state.sdM !== 0 ? this.state.sdM[0].prtf[1] : this.state.sdM} </div>
          <div>Buy {this.props.name[2]}: {this.state.sdM !== 0 ? this.state.sdM[0].prtf[2] : this.state.sdM} </div>
          <div>Buy {this.props.name[3]}: {this.state.sdM !== 0 ? this.state.sdM[0].prtf[3] : this.state.sdM} </div>
        </div>
        <hr/>
        Hard is testing! work only with 3 stock! Time wait - 2min!
        <hr/>
        <div>
          <div className="analytic" onClick={this.showResultH}>Analytics Hard! (click me)
          </div>
          <div>Min: {this.state.sdH !== 0 ? this.state.sdH[0].sd : this.state.sdH}</div>
          <div>Max: {this.state.sdH !== 0 ? this.state.sdH[1].sd : this.state.sdH}</div>
          <div>Buy {this.props.name[0]}: {this.state.sdH !== 0 ? this.state.sdH[0].prtf[0] : this.state.sdH} </div>
          <div>Buy {this.props.name[1]}: {this.state.sdH !== 0 ? this.state.sdH[0].prtf[1] : this.state.sdH} </div>
          <div>Buy {this.props.name[2]}: {this.state.sdH !== 0 ? this.state.sdH[0].prtf[2] : this.state.sdH} </div>
          <div>Buy {this.props.name[3]}: {this.state.sdH !== 0 ? this.state.sdH[0].prtf[3] : this.state.sdH} </div>
        </div>
      
      </div>
    );
  }
}

export default Analytics;