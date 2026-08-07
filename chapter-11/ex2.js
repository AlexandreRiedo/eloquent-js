function activityTable(day) {
    let table = [];
    for (let i = 0; i < 24; i++) table[i] = 0;

    let P_logFileList = new Promise(resolve => {
        resolve(textFile("camera_logs.txt"));
    })

    let P_splitLogFileList = P_logFileList.then(value => value.split("\n"));

    let result = P_splitLogFileList.then(
      value => Promise.all(
        value.map(
          file => {
            let read = textFile(file);
            read = read.then(value => {
              let valueAll = value.trim().split("\n");

              for (let timestamp of valueAll) {
                  let date = new Date(Number(timestamp));
                  if (date.getDay() == day) {
                      table[date.getHours()]++;
                  }  
                  // console.log(date);
                  return timestamp;
              }
              
            });
            
            return read;
          }
        )
      )
    )

    result.then(console.log);
    // console.log(table);
    return table;
}

activityTable(6)
    .then(table => console.log(activityGraph(table)));