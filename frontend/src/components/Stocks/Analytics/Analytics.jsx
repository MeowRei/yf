import React, {Component} from 'react';
import classes from './Analytics.module.css';

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
      srMVP: 0,
      srMVE: 0,
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
    //=(1+A5)^(1/12)-1
    const risk = Math.pow((1 + (props.risk / 100)), (1 / 12)) - 1;

    //--------------------------------------------------------------
    
    //--------------------------------------------------------------
    
    //Set state-----------------------------------
    return {
      ...state, ...{
        source,
        avg,
        stdev,
        disper,
        vcm,
        risk,
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
  
  showRisk = (sd) => {
    const risk = ((mmult(this.state.avg, sd.prtf) -
      this.state.risk) / sd.sd).toFixed(3);
    
    // console.log(mmult(this.state.avg, sd.prtf));
    // console.log('Props',this.props.value);
    // console.log('State',this.state.source);
    // console.log(this.state.avg);
    // console.log(sd.prtf);
    // console.log(this.state.risk);
    // console.log(sd.sd);
    
    return risk;
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
    // console.log(this.state);
    // console.log(this.props.risk);
    // const risk = Math.pow((1 + (2.01 / 100)), (1 / 12)) - 1;
    // console.log(risk);
    // console.log(this.state.sd[0].prtf && 0);
    // console.log(this.state.avg);
    //----------buy-----------
    const buyElem = [];
    for (let i = 0; i < this.props.name.length; i++) {
      buyElem.push(
        <div
          key={i}
        >Buy {this.props.name[i]}: {this.state.sd !== 0
          ? this.state.sd[0].prtf[i]
          : this.state.sd} </div>);
    }
    //----------buy-----------
    
    //----------Matrix-----------
    //head
    const theadMatrix = [];
    
    for (let i = 0; i < this.props.name.length; i++) {
      theadMatrix.push(
        <th
          key={i + 10}
        >{this.props.name[i]}</th>);
    }
    //body
    const tbodyData = [];
    
    if (this.props.name.length > 1) {
      
      for (let i = 0; i < this.props.name.length; i++) {
        let tempData = [];
        for (let j = 0; j < this.props.name.length; j++) {
          tempData.push
          (<td
            key={i + j + 1000}
          >{this.state.vcm[i][j]
            ? (this.state.vcm[i][j]).toFixed(3)
            : null}</td>);
        }
        tbodyData.push(tempData);
      }
    }
    
    const tbodyMatrix = [];
    
    for (let i = 0; i < this.props.name.length; i++) {
      tbodyMatrix.push(
        <tr
          key={i}
        >
          <td>{this.props.name[i]}</td>
          {this.props.name.length > 1 ? tbodyData[i] : '0'}
        </tr>);
    }
    //----------Matrix-----------
    //----------MVP-MVE----------
    function mvEP (sd) {
      const prtf = [];
      for (let i = 0; i < sd.prtf.length; i++) {
        prtf.push(
          <td>{sd.prtf[i]}</td>
        )
      }
      return prtf;
    }
    //----------MVP-MVE----------
  
    return (
      <div>
        <hr/>
        Matrix
        <div
          className={classes.Analytics}
        >
          {this.state.vcm.length >= 2 ?
            <table>
              <thead>
              <tr>
                <th></th>
                {theadMatrix}
              </tr>
              </thead>
              <tbody>
              {tbodyMatrix}
              </tbody>
            </table>
            : null}
        </div>
        <hr/>
        <div
          className={classes.Analytics}
        >
          {this.state.sd !== 0 ?
            <table>
              <thead>
              <tr>
                <th></th>
                {theadMatrix}
                <th>Er</th>
                <th>Variance</th>
                <th>Sd</th>
                <th>Sr</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>MVP</td>
                {mvEP(this.state.sd[0])}
                <td>{(mmult(this.state.avg, this.state.sd[0].prtf)).toFixed(
                  3)}</td>
                {/*Variance*/}
                <td>{this.state.sd[0].variance
                  ? this.state.sd[0].variance.toFixed(3)
                  : '0'}</td>
                {/*sd*/}
                <td>{this.state.sd[0].sd
                  ? this.state.sd[0].sd.toFixed(3)
                  : '0'}</td>
                {/*sr*/}
                <td>{this.showRisk(this.state.sd[0])}</td>
              </tr>
              <tr>
                <td>MVE</td>
                {mvEP(this.state.sd[1])}
                <td>{(mmult(this.state.avg, this.state.sd[1].prtf)).toFixed(
                  3)}</td>
                <td>{this.state.sd[1].variance
                  ? this.state.sd[1].variance.toFixed(3)
                  : '0'}</td>
                <td>{this.state.sd[1].sd
                  ? this.state.sd[1].sd.toFixed(3)
                  : '0'}</td>
                <td>{
                  // ((mmult(this.state.avg, this.state.sd[1].prtf) -
                  // this.state.risk) / this.state.sd[1].sd).toFixed(3)
                  this.showRisk(this.state.sd[1])
                }</td>
              </tr>
              </tbody>
            </table>
            : null}
        </div>
        <hr/>
        <div>
          <div>Analytics!</div>
          <button className="analytic" onClick={this.showRes}>
            (click me)
          </button>
          {buyElem}
        </div>
        <hr/>
      </div>
    );
  }
}

export default Analytics;