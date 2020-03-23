function standardDeviation(arr) {
  const task1 = arr.reduce((sum, elem) => sum + elem) / arr.length; // 1
  const task2 = arr.map(elem => elem - task1); //2
  const task3 = task2.map(elem => elem * elem); //3
  const task4 = task3.reduce((sum, elem) => sum + elem); //4
  const task5 = task4 / (arr.length - 1); //5
  const task6 = Math.sqrt(task5); //6
  return task6;
}

function mean(arr) {
  const task1 = arr.reduce((sum, elem) => sum + elem) / arr.length;
  return task1;
}

function dispersion(arr) {
  const task1 = arr.reduce((sum, elem) => sum + elem) / arr.length; // 1
  const task2 = arr.map(elem => elem - task1); //2
  const task3 = task2.map(elem => elem * elem); //3
  const task4 = task3.reduce((sum, elem) => sum + elem); //4
  const task5 = task4 / (arr.length); //5
  const task6 = Math.sqrt(task5); //6
  const task7 = task6 * task6; //7
  return task7;
}

function covariance(arr1, arr2) {
  let task1 = 0;
  for (let i = 0; i < arr1.length; i++) {
    task1 += arr1[i] * arr2[i];
  }
  const task2 = mean(arr1) * mean(arr2);
  const task3 = task1 / arr1.length;
  const task4 = task3 - task2;
  return task4;
}

function mmult(arr1, arr2) {
  if (typeof arr2[0] === 'object') {
    const task1 = [];
    for (let i = 0; i < arr1.length; i++) {
      let task2 = 0;
      for (let j = 0; j < arr1.length; j++) {
        task2 += (arr1[j] * arr2[i][j]);
      }
      task1.push(task2);
    }
    return task1;
  } else {
    let task1 = 0;
    for (let i = 0; i < arr2.length; i++) {
      task1 += (arr1[i] * arr2[i]);
    }
    return task1;
  }
}

function value2(arr1, arr2, avg, risk) {
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  
  const max = {
    variance: 0,
    sd: 0,
    sr: 0,
    prtf: [],
  };
  
  let workArr = [...arr1];
  let newArr = [...workArr];
  
  for (let z = 0; z < arr1.length; z++) {
    
    for (let j = z + 1; j < workArr.length; j++) {
      let tempArr = [...newArr];
      
      //-------счетчик---------
      for (let i = 0; i < 1 - 0.001; i = i + 0.001) {
        
        const task1 = (mmult(tempArr, arr2));
        const task2 = mmult(tempArr, task1);
        const task3 = Math.sqrt(task2); //SD
        const task4 = mmult(avg,tempArr); //Er
        const task5 = ((task4-risk)/task3); //Sr

        
        if (min.sd > task3) {
          min.variance = task2;
          min.sd = task3;
          min.prtf = [...tempArr];
        }
        
        if (max.sr < task5) {
          max.variance = task2;
          max.sd = task3;
          max.sr = task5;
          max.prtf = [...tempArr];
        }
        
        tempArr[z] = Number(
          Number.parseFloat(tempArr[z] - 0.001).toFixed(3));
        tempArr[j] = Number(
          Number.parseFloat(tempArr[j] + 0.001).toFixed(3));
      }
      //---------------------------
      
      tempArr = [...newArr];
      
    }
    if (z < workArr.length - 1) {
      newArr[z] = 0;
      newArr[z + 1] = 1;
    }
  }
  return [min, max];
}

// function value3(arr1, arr2) {
//   const min = {
//     variance: 0,
//     sd: 5000,
//     prtf: [],
//   };
//
//   const max = {
//     variance: 0,
//     sd: 0,
//     prtf: [],
//   };
//
//   let newArr = [...arr1];
//   //начальные настройки массива
//   newArr[0] = newArr[0] - 0.000002; //цикл
//   newArr[1] = newArr[1] + 0.000001; //цикл
//   newArr[2] = newArr[2] + 0.000001; //+1
//   // tempArr[3]; //0
//   for (let z = 0; z < newArr.length; z++) {
//     let tempArr = [...newArr];
//
//     for (let j = 0; j < 1 - 0.000003; j = j + 0.000001) {
//       //-------счетчик---------
//       for (let i = 0; i < 1 - 0.000003; i = i + 0.000001) {
//         //
//         const task1 = (mmult(tempArr, arr2));
//         const task2 = mmult(tempArr, task1); //mm
//         const task3 = Math.sqrt(task2); //SD
//         //
//         if (min.sd > task3) {
//           min.variance = task2;
//           min.sd = task3;
//           min.prtf = [...tempArr];
//         }
//
//         if (max.sd < task3) {
//           max.variance = task2;
//           max.sd = task3;
//           max.prtf = [...tempArr];
//         }
//         //
//         tempArr[0] = Number(
//           Number.parseFloat(tempArr[0] - 0.000001).toFixed(6));
//         tempArr[1] = Number(
//           Number.parseFloat(tempArr[1] + 0.000001).toFixed(6));
//       }
//       tempArr = [...newArr];
//       if (tempArr[0] !== 0.000001) {
//         tempArr[0] = tempArr[0] - 0.000001; //цикл
//         tempArr[2] = tempArr[2] + 0.000001; //+1
//         // console.log(tempArr);
//       }
//     }
//     tempArr = [...newArr];
//     const val = tempArr[0];
//     tempArr.splice(0, 1);
//     tempArr.push(val);
//   }
//
//   // console.log((tempArr[1] === 0) && (tempArr[2] === 0));
//   return [min, max];
// }


function value31(arr,avg,risk) {
  
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  const max = {
    variance: 0,
    sd: 0,
    sr: 0,
    prtf: [],
  };
  // const mainArr = [0.0001, 0.0001, 0.9997];
  const mainArr = [0, 0, 1];
  
  let tempArr = [...mainArr];
  
  for (let i = 0; i < 1 - 0.001; i = i + 0.001) {
    let workArr = [...tempArr];
    for (let k = 0; k < workArr[2] - workArr[0]; k = k + 0.001) {
      const task1 = (mmult(workArr, arr));
      const task2 = mmult(workArr, task1);
      const task3 = Math.sqrt(task2); //SD
      const task4 = mmult(avg,workArr); //Er
      const task5 = ((task4-risk)/task3); //Sr
      
      if (min.sd > task3) {
        min.variance = task2;
        min.sd = task3;
        min.prtf = [...workArr];
      }
      
      if (max.sr < task5) {
        max.variance = task2;
        max.sd = task3;
        max.sr = task5;
        max.prtf = [...workArr];
      }
      workArr[1] = Number(
        Number.parseFloat(workArr[1] + 0.001).toFixed(3));
      workArr[2] = Number(
        Number.parseFloat(workArr[2] - 0.001).toFixed(3));
    }
    tempArr[0] = Number(
      Number.parseFloat(tempArr[0] + 0.001).toFixed(3));
    tempArr[2] = Number(
      Number.parseFloat(tempArr[2] - 0.001).toFixed(3));
  }
  return [min, max];
}

function value32(arr,avg, risk) {
  
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  const max = {
    variance: 0,
    sd: 0,
    sr:0,
    prtf: [],
  };
  // const mainArr = [0.0001, 0.9997, 0.0001];
  const mainArr = [0, 1, 0];
  
  let tempArr = [...mainArr];
  
  for (let i = 0; i < 1 - 0.001; i = i + 0.001) {
    let workArr = [...tempArr];
    for (let k = 0; k < workArr[1] - workArr[2]; k = k + 0.001) {
      const task1 = (mmult(workArr, arr));
      const task2 = mmult(workArr, task1);
      const task3 = Math.sqrt(task2); //SD
      const task4 = mmult(avg,workArr); //Er
      const task5 = ((task4-risk)/task3); //Sr
  
      if (min.sd > task3) {
        min.variance = task2;
        min.sd = task3;
        min.prtf = [...workArr];
      }
  
      if (max.sr < task5) {
        max.variance = task2;
        max.sd = task3;
        max.sr = task5;
        max.prtf = [...workArr];
      }
      workArr[0] = Number(
        Number.parseFloat(workArr[0] + 0.001).toFixed(3));
      workArr[1] = Number(
        Number.parseFloat(workArr[1] - 0.001).toFixed(3));
    }
    tempArr[2] = Number(
      Number.parseFloat(tempArr[2] + 0.001).toFixed(3));
    tempArr[1] = Number(
      Number.parseFloat(tempArr[1] - 0.001).toFixed(3));
  
    
  }
  return [min, max];
}

function value33(arr,avg,risk) {
  
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  const max = {
    variance: 0,
    sd: 0,
    sr:0,
    prtf: [],
  };
  // const mainArr = [0.9997, 0.0001, 0.0001];
  const mainArr = [1, 0, 0];
  
  let tempArr = [...mainArr];
  
  for (let i = 0; i < 1 - 0.001; i = i + 0.001) {
    let workArr = [...tempArr];
    for (let k = 0; k < workArr[0] - workArr[1]; k = k + 0.001) {
      const task1 = (mmult(workArr, arr));
      const task2 = mmult(workArr, task1);
      const task3 = Math.sqrt(task2); //SD
      const task4 = mmult(avg,workArr); //Er
      const task5 = ((task4-risk)/task3); //Sr
  
      if (min.sd > task3) {
        min.variance = task2;
        min.sd = task3;
        min.prtf = [...workArr];
      }
  
      if (max.sr < task5) {
        max.variance = task2;
        max.sd = task3;
        max.sr = task5;
        max.prtf = [...workArr];
      }
      workArr[2] = Number(
        Number.parseFloat(workArr[2] + 0.001).toFixed(3));
      workArr[0] = Number(
        Number.parseFloat(workArr[0] - 0.001).toFixed(3));
    }
    tempArr[1] = Number(
      Number.parseFloat(tempArr[1] + 0.001).toFixed(3));
    tempArr[0] = Number(
      Number.parseFloat(tempArr[0] - 0.001).toFixed(3));
  }
  return [min, max];
}

function value41(arr,avg,risk) {
  
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  const max = {
    variance: 0,
    sd: 0,
    sr: 0,
    prtf: [],
  };
  // const mainArr = [0.997, 0.001, 0.001, 0.001];
  const mainArr = [1, 0, 0, 0];
  
  let tempArr = [...mainArr];
  
  for (let i = 0; i < 1 - 0.001; i = i + 0.001) {
    let workArr = [...tempArr];
    for (let k = 0; k < workArr[0] - workArr[1] - workArr[2]; k = k + 0.001) {
      let simpleArr = [...workArr];
      for (let j = 0; j < simpleArr[0] - (simpleArr[1] + simpleArr[2]); j = j + 0.001) {
        
        const task1 = (mmult(simpleArr, arr));
        const task2 = mmult(simpleArr, task1);
        const task3 = Math.sqrt(task2); //SD
        const task4 = mmult(avg,simpleArr); //Er
        const task5 = ((task4-risk)/task3); //Sr
  
        if (min.sd > task3) {
          min.variance = task2;
          min.sd = task3;
          min.prtf = [...simpleArr];
        }
  
        if (max.sr < task5) {
          max.variance = task2;
          max.sd = task3;
          max.sr = task5;
          max.prtf = [...simpleArr];
        }
        simpleArr[3] = Number(
          Number.parseFloat(simpleArr[3] + 0.001).toFixed(3));
        simpleArr[0] = Number(
          Number.parseFloat(simpleArr[0] - 0.001).toFixed(3));
      }
      
      workArr[2] = Number(
        Number.parseFloat(workArr[2] + 0.001).toFixed(3));
      workArr[0] = Number(
        Number.parseFloat(workArr[0] - 0.001).toFixed(3));
  
    }
    tempArr[1] = Number(
      Number.parseFloat(tempArr[1] + 0.001).toFixed(3));
    tempArr[0] = Number(
      Number.parseFloat(tempArr[0] - 0.001).toFixed(3));
  
  
  }
  return [min, max];
}

function value42(arr,avg,risk) {
  
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  const max = {
    variance: 0,
    sd: 0,
    sr:0,
    prtf: [],
  };
  // const mainArr = [0.001, 0.997, 0.001, 0.001];
  const mainArr = [0, 1, 0, 0];
  
  let tempArr = [...mainArr];
  
  for (let i = 0; i < 1 - 0.001; i = i + 0.001) {
    let workArr = [...tempArr];
    for (let k = 0; k < workArr[1] - workArr[2] - workArr[3]; k = k + 0.001) {
      let simpleArr = [...workArr];
      for (let j = 0; j < simpleArr[1] - (simpleArr[2] + simpleArr[3]); j = j + 0.001) {
        
        const task1 = (mmult(simpleArr, arr));
        const task2 = mmult(simpleArr, task1);
        const task3 = Math.sqrt(task2); //SD
        const task4 = mmult(avg,simpleArr); //Er
        const task5 = ((task4-risk)/task3); //Sr
  
        if (min.sd > task3) {
          min.variance = task2;
          min.sd = task3;
          min.prtf = [...simpleArr];
        }
  
        if (max.sr < task5) {
          max.variance = task2;
          max.sd = task3;
          max.sr = task5;
          max.prtf = [...simpleArr];
        }
        simpleArr[0] = Number(
          Number.parseFloat(simpleArr[0] + 0.001).toFixed(3));
        simpleArr[1] = Number(
          Number.parseFloat(simpleArr[1] - 0.001).toFixed(3));
      }
      
      workArr[3] = Number(
        Number.parseFloat(workArr[3] + 0.001).toFixed(3));
      workArr[1] = Number(
        Number.parseFloat(workArr[1] - 0.001).toFixed(3));
      
    }
    tempArr[2] = Number(
      Number.parseFloat(tempArr[2] + 0.001).toFixed(3));
    tempArr[1] = Number(
      Number.parseFloat(tempArr[1] - 0.001).toFixed(3));
    
    
  }
  return [min, max];
}

function value43(arr,avg,risk) {
  
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  const max = {
    variance: 0,
    sd: 0,
    sr:0,
    prtf: [],
  };
  // const mainArr = [0.997, 0.001, 0.001, 0.001];
  const mainArr = [0, 0, 1, 0];
  
  let tempArr = [...mainArr];
  
  for (let i = 0; i < 1 - 0.001; i = i + 0.001) {
    let workArr = [...tempArr];
    for (let k = 0; k < workArr[2] - workArr[3] - workArr[0]; k = k + 0.001) {
      let simpleArr = [...workArr];
      for (let j = 0; j < simpleArr[2] - (simpleArr[3] + simpleArr[0]); j = j + 0.001) {
        
        const task1 = (mmult(simpleArr, arr));
        const task2 = mmult(simpleArr, task1);
        const task3 = Math.sqrt(task2); //SD
        const task4 = mmult(avg,simpleArr); //Er
        const task5 = ((task4-risk)/task3); //Sr
  
        if (min.sd > task3) {
          min.variance = task2;
          min.sd = task3;
          min.prtf = [...simpleArr];
        }
  
        if (max.sr < task5) {
          max.variance = task2;
          max.sd = task3;
          max.sr = task5;
          max.prtf = [...simpleArr];
        }
        simpleArr[1] = Number(
          Number.parseFloat(simpleArr[1] + 0.001).toFixed(3));
        simpleArr[2] = Number(
          Number.parseFloat(simpleArr[2] - 0.001).toFixed(3));
      }
      
      workArr[0] = Number(
        Number.parseFloat(workArr[0] + 0.001).toFixed(3));
      workArr[2] = Number(
        Number.parseFloat(workArr[2] - 0.001).toFixed(3));
      
    }
    tempArr[3] = Number(
      Number.parseFloat(tempArr[3] + 0.001).toFixed(3));
    tempArr[2] = Number(
      Number.parseFloat(tempArr[2] - 0.001).toFixed(3));
    
    
  }
  return [min, max];
}

function value44(arr,avg,risk) {
  
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  const max = {
    variance: 0,
    sd: 0,
    sr:0,
    prtf: [],
  };
  // const mainArr = [0.997, 0.001, 0.001, 0.001];
  const mainArr = [0, 0, 0, 1];
  
  let tempArr = [...mainArr];
  
  for (let i = 0; i < 1 - 0.001; i = i + 0.001) {
    let workArr = [...tempArr];
    for (let k = 0; k < workArr[3] - workArr[0] - workArr[1]; k = k + 0.001) {
      let simpleArr = [...workArr];
      for (let j = 0; j < simpleArr[3] - (simpleArr[0] + simpleArr[1]); j = j + 0.001) {
        
        const task1 = (mmult(simpleArr, arr));
        const task2 = mmult(simpleArr, task1);
        const task3 = Math.sqrt(task2); //SD
        const task4 = mmult(avg,simpleArr); //Er
        const task5 = ((task4-risk)/task3); //Sr
  
        if (min.sd > task3) {
          min.variance = task2;
          min.sd = task3;
          min.prtf = [...simpleArr];
        }
  
        if (max.sr < task5) {
          max.variance = task2;
          max.sd = task3;
          max.sr = task5;
          max.prtf = [...simpleArr];
        }
        simpleArr[2] = Number(
          Number.parseFloat(simpleArr[2] + 0.001).toFixed(3));
        simpleArr[3] = Number(
          Number.parseFloat(simpleArr[3] - 0.001).toFixed(3));
      }
      
      workArr[1] = Number(
        Number.parseFloat(workArr[1] + 0.001).toFixed(3));
      workArr[3] = Number(
        Number.parseFloat(workArr[3] - 0.001).toFixed(3));
      
    }
    tempArr[0] = Number(
      Number.parseFloat(tempArr[0] + 0.001).toFixed(3));
    tempArr[3] = Number(
      Number.parseFloat(tempArr[3] - 0.001).toFixed(3));
    
  }
  return [min, max];
}

export {
  standardDeviation,
  mean,
  dispersion,
  covariance,
  mmult,
  value2,
  value31, value32, value33,
  value41, value42, value43, value44,
};
