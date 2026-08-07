function activityTable(day) {
  let P_logFileList = new Promise(resolve => {
      resolve(textFile("camera_logs.txt"));
  })

  let P_splitLogFileList = P_logFileList.then(value => value.split("\n"));

  let P_readAllFiles = P_splitLogFileList.then(value => Promise.all(value.map((item) => textFile(item))));
  
  let result = P_readAllFiles.then(value => {
    let table = [];
    for (let i = 0; i < 24; i++) table[i] = 0;
    
    for (let file of value) {
        let splitArray = file.split("\n");
        for (let timestamp of splitArray) {
            let date = new Date(Number(timestamp));
            if (date.getDay() == day) {
                table[date.getHours()]++;
            }
        }
    }
    return table;
  })

  return result;  
}

activityTable(6)
  .then(table => console.log(activityGraph(table)));