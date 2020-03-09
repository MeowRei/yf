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

function value1(arr1, arr2) {
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  const max = {
    variance: 0,
    sd: 0,
    prtf: [],
  };
  
  let workArr = [...arr1];
  
  for (let i = 0; i < workArr.length; i++) {
    const task1 = (mmult(workArr, arr2));
    const task2 = mmult(workArr, task1); //Variance
    const task3 = Math.sqrt(task2); //SD
    
    if (min.sd > task3) {
      min.variance = task2;
      min.sd = task3;
      min.prtf = [...workArr];
    }
    
    if (max.sd < task3) {
      max.variance = task2;
      max.sd = task3;
      max.prtf = [...workArr];
    }
    
    if (i < workArr.length - 1) {
      workArr[i] = 0;
      workArr[i + 1] = 1;
    }
  }
  return [min, max];
}

function value2(arr1, arr2) {
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  const max = {
    variance: 0,
    sd: 0,
    prtf: [],
  };
  
  let workArr = [...arr1];
  let newArr = [...workArr];
  
  for (let z = 0; z < arr1.length; z++) {
    
    for (let j = z + 1; j < workArr.length; j++) {
      let tempArr = [...newArr];
      
      //-------счетчик---------
      for (let i = 0; i < 1 - 0.000001; i = i + 0.000001) {
        
        const task1 = (mmult(tempArr, arr2));
        const task2 = mmult(tempArr, task1);
        const task3 = Math.sqrt(task2); //SD
        
        if (min.sd > task3) {
          min.variance = task2;
          min.sd = task3;
          min.prtf = [...tempArr];
        }
        
        if (max.sd < task3) {
          max.variance = task2;
          max.sd = task3;
          max.prtf = [...tempArr];
        }
        
        tempArr[z] = Number(
          Number.parseFloat(tempArr[z] - 0.000001).toFixed(6));
        tempArr[j] = Number(
          Number.parseFloat(tempArr[j] + 0.000001).toFixed(6));
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

function value3(arr1, arr2) {
  const min = {
    variance: 0,
    sd: 5000,
    prtf: [],
  };
  
  const max = {
    variance: 0,
    sd: 0,
    prtf: [],
  };
  
  let newArr = [...arr1];
  //начальные настройки массива
  newArr[0] = newArr[0] - 0.000002; //цикл
  newArr[1] = newArr[1] + 0.000001; //цикл
  newArr[2] = newArr[2] + 0.000001; //+1
  // tempArr[3]; //0
  
  for (let j = 0; j < newArr.length; j++) {
    const tempArr = [...newArr];
    //-------счетчик---------
    for (let i = 0; i < 1 - 0.000003; i = i + 0.000001) {
      //
      const task1 = (mmult(tempArr, arr2));
      const task2 = mmult(tempArr, task1); //mm
      const task3 = Math.sqrt(task2); //SD
      //
      if (min.sd > task3) {
        min.variance = task2;
        min.sd = task3;
        min.prtf = [...tempArr];
      }
      
      if (max.sd < task3) {
        max.variance = task2;
        max.sd = task3;
        max.prtf = [...tempArr];
      }
      //
      tempArr[0] = Number(
        Number.parseFloat(tempArr[0] - 0.000001).toFixed(6));
      tempArr[1] = Number(
        Number.parseFloat(tempArr[1] + 0.000001).toFixed(6));
    }
    if (tempArr[0] !== 0.000001) {
      tempArr[0] = tempArr[0] - 0.000001; //цикл
      tempArr[2] = tempArr[2] + 0.000001; //+1
      console.log(tempArr)
    }
  }
  
  // console.log((tempArr[1] === 0) && (tempArr[2] === 0));
  return [min, max];
}

function value4(arr1, arr2) {

}

export {
  standardDeviation,
  mean,
  dispersion,
  covariance,
  mmult,
  value1,
  value2,
  value3,
  value4,
};
