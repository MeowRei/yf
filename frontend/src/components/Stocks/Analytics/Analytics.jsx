import React, {Component} from 'react';
import classes from './Analytics.css';
import {
  mmult,
  mean,
  standardDeviation,
  dispersion,
  covariance,
  value2,
  value31,
  value32,
  value33,
  value41,
  value42,
  value43,
  value44,
} from './fromuls.jsx';

class Analytics extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      er: [],
      sdHtest: [],
      sdLtest: [],
      sd: 0,
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
    
    source.map(elem =>
      avg.push(mean(elem)),
    );
    source.map(elem =>
      stdev.push(standardDeviation(elem)),
    );
    source.map(elem =>
      disper.push(dispersion(elem)),
    );
    
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
    
    // const variant2 = [
    //   [0.005615179, -0.004727057, 0.001078098, 0.0008552],
    //   [-0.004727057, 0.041083456, 0.000753167, 0.003287635],
    //   [0.001078098, 0.000753167, 0.001031119, 0.001278456],
    // [0.0008552, 0.003287635, 0.001278456, 0.006159359],
    // ];
    
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
      },
    };
  }
  
  showRes = () => {
    
    if (this.state.vcm.length === 2) {
      this.showResultM();
    }
    
    if (this.state.vcm.length === 3) {
      this.showResultH();
    }
    
    if (this.state.vcm.length === 4) {
      this.showResultL();
    }

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
      sd: two,
    });
    
  };
  
  showResultH = () => {
    
    if (this.state.vcm.length === 3) {
      
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
        const allMaxSd = [arr1[1].sd, arr2[1].sd, arr3[1].sd];
        const iMax = allMaxSd.indexOf(
          Math.max(arr1[1].sd, arr2[1].sd, arr3[1].sd));
        return all[iMax];
      }
      
      const threeMin = min(three1, three2, three3);
      const threeMax = max(three1, three2, three3);
      
      this.setState({
        sd: [threeMin[0], threeMax[1]],
        sdHtest: [three1, three2, three3],
      });
    }
    
  };
  
  showResultL = () => {
    
    if (this.state.vcm.length === 4) {
      
      const four1 = value41(this.state.vcm);
      const four2 = value42(this.state.vcm);
      const four3 = value43(this.state.vcm);
      const four4 = value44(this.state.vcm);
      
      function min(arr1, arr2, arr3, arr4) {
        const all = [arr1, arr2, arr3, arr4];
        const allMinSd = [arr1[0].sd, arr2[0].sd, arr3[0].sd, arr4[0].sd];
        const iMin = allMinSd.indexOf(
          Math.min(arr1[0].sd, arr2[0].sd, arr3[0].sd, arr4[0].sd));
        return all[iMin];
      }
      
      function max(arr1, arr2, arr3, arr4) {
        const all = [arr1, arr2, arr3, arr4];
        const allMaxSd = [arr1[1].sd, arr2[1].sd, arr3[1].sd, arr4[1].sd];
        const iMax = allMaxSd.indexOf(
          Math.max(arr1[1].sd, arr2[1].sd, arr3[1].sd, arr4[1].sd));
        return all[iMax];
      }
      
      const fourMin = min(four1, four2, four3, four4);
      const fourMax = max(four1, four2, four3, four4);
      
      this.setState({
        sd: [fourMin[0], fourMax[1]],
        sdLtest: [four1, four2, four3, four4],
      });
    }
    // console.log(test4);
  };
  
  clearState = () => {
    this.setState({
      sdE: 0,
      sdM: 0,
      sdH: 0,
      sdHtest: [],
      sdL: 0,
      sdLtest: [],
    });
  };
  
  render() {
    
    const buyElem = [];
  
    for (let i = 0; i < this.props.name.length; i++) {
      buyElem.push(
        <div
          key={i}
        >Buy {this.props.name[i]}: {this.state.sd !== 0
        ? this.state.sd[0].prtf[i]
        : this.state.sd} </div>)
    }
    
    return (
      <div>
        <hr/>
        Matrix
        <div className={classes.Analytics}>
          {this.state.vcm.length >= 2 ?
            <table>
              <thead>
              <tr>
                <th></th>
                <th>{this.props.name[0]}</th>
                <th>{this.props.name[1]}</th>
                <th>{this.props.name[2]}</th>
                <th>{this.props.name[3]}</th>
              </tr>
              </thead>
              <tbody>
              
              <tr>
                <td>{this.props.name[0]}</td>
                <td>{this.state.vcm[0][0] ? this.state.vcm[0][0] : null}</td>
                <td>{this.state.vcm[0][1] ? this.state.vcm[0][1] : null}</td>
                <td>{this.state.vcm.length >= 3
                  ? this.state.vcm[0][2]
                  : null}</td>
                <td>{this.state.vcm.length >= 4
                  ? this.state.vcm[0][3]
                  : null}</td>
              </tr>
              <tr>
                <td>{this.props.name[1]}</td>
                <td>{this.state.vcm[1][0] ? this.state.vcm[1][0] : null}</td>
                <td>{this.state.vcm[1][1] ? this.state.vcm[1][1] : null}</td>
                <td>{this.state.vcm.length >= 3
                  ? this.state.vcm[1][2]
                  : null}</td>
                <td>{this.state.vcm.length >= 4
                  ? this.state.vcm[1][3]
                  : null}</td>
              </tr>
              <tr>
                <td>{this.props.name[2]}</td>
                <td>{this.state.vcm.length >= 3
                  ? this.state.vcm[2][0]
                  : null}</td>
                <td>{this.state.vcm.length >= 3
                  ? this.state.vcm[2][1]
                  : null}</td>
                <td>{this.state.vcm.length >= 3
                  ? this.state.vcm[2][2]
                  : null}</td>
                <td>{this.state.vcm.length >= 4
                  ? this.state.vcm[2][3]
                  : null}</td>
              </tr>
              <tr>
                <td>{this.props.name[3]}</td>
                <td>{this.state.vcm.length >= 4
                  ? this.state.vcm[3][0]
                  : null}</td>
                <td>{this.state.vcm.length >= 4
                  ? this.state.vcm[3][1]
                  : null}</td>
                <td>{this.state.vcm.length >= 4
                  ? this.state.vcm[3][2]
                  : null}</td>
                <td>{this.state.vcm.length >= 4
                  ? this.state.vcm[3][3]
                  : null}</td>
              </tr>
              </tbody>
            </table>
            : null}
        </div>
        <hr/>
        <div className={classes.Analytics}>
          {this.state.sd !== 0 ?
            <table>
              <thead>
              <tr>
                <th></th>
                <th>{this.props.name[0]}</th>
                <th>{this.props.name[1]}</th>
                <th>{this.props.name[2]}</th>
                <th>{this.props.name[3]}</th>
                <th>Er</th>
                <th>Variance</th>
                <th>Sd</th>
                <th>Sr</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>MVP</td>
                <td>{this.state.sd[0].prtf[0]
                  ? this.state.sd[0].prtf[0]
                  : null}</td>
                <td>{this.state.sd[0].prtf[1]
                  ? this.state.sd[0].prtf[1]
                  : null}</td>
                <td>{this.state.sd[0].prtf[2]
                  ? this.state.sd[0].prtf[2]
                  : null}</td>
                <td>{this.state.sd[0].length >= 4
                  ? this.state.sd[0].prtf[3]
                  : null}</td>
                <td>{mmult(this.state.avg, this.state.sd[0].prtf)}</td>
                <td>{this.state.sd[0].variance
                  ? this.state.sd[0].variance
                  : null}</td>
                <td>{this.state.sd[0].sd ? this.state.sd[0].sd : null}</td>
                <td>sr</td>
              </tr>
              <tr>
                <td>MVE</td>
                <td>{this.state.sd[1].prtf[0]
                  ? this.state.sd[1].prtf[0]
                  : null}</td>
                <td>{this.state.sd[1].prtf[1]
                  ? this.state.sd[1].prtf[1]
                  : null}</td>
                <td>{this.state.sd[1].prtf[2]
                  ? this.state.sd[1].prtf[2]
                  : null}</td>
                <td>{this.state.sd[1].length >= 4
                  ? this.state.sd[1].prtf[3]
                  : null}</td>
                <td>{mmult(this.state.avg, this.state.sd[1].prtf)}</td>
                <td>{this.state.sd[1].variance
                  ? this.state.sd[1].variance
                  : null}</td>
                <td>{this.state.sd[1].sd ? this.state.sd[1].sd : null}</td>
                <td>sr</td>
              </tr>
              </tbody>
            </table>
            : null}
        </div>
        <hr/>
        <div>
          <div className="analytic" onClick={this.showRes}>
            Analytics! (click me)
          </div>
          {/*<div>Min: {this.state.sd !== 0*/}
          {/*  ? this.state.sd[0].sd*/}
          {/*  : this.state.sd}</div>*/}
          {/*<div>Max: {this.state.sd !== 0*/}
          {/*  ? this.state.sd[1].sd*/}
          {/*  : this.state.sd}</div>*/}
          {buyElem}
          {/*<div>Buy {this.props.name[0]}: {this.state.sd !== 0*/}
          {/*  ? this.state.sd[0].prtf[0]*/}
          {/*  : this.state.sd} </div>*/}
          {/*<div>Buy {this.props.name[1]}: {this.state.sd !== 0*/}
          {/*  ? this.state.sd[0].prtf[1]*/}
          {/*  : this.state.sd} </div>*/}
          {/*<div>Buy {this.props.name[2]}: {this.state.sd !== 0*/}
          {/*  ? this.state.sd[0].prtf[2]*/}
          {/*  : this.state.sd} </div>*/}
          {/*<div>Buy {this.props.name[3]}: {this.state.sd !== 0*/}
          {/*  ? this.state.sd[0].prtf[3]*/}
          {/*  : this.state.sd} </div>*/}
        </div>
        <hr/>
      </div>
    );
  }
}

export default Analytics;