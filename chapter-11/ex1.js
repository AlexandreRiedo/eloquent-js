async function activityTable(day) {
  let result = [];
  for (let counter = 0; counter < 24; counter++) {
    result.push(0);
  }
  
  let logFileList = await textFile("camera_logs.txt");
  let splitList = logFileList.split("\n");

  for (let file of splitList) {
    let fileRead = await textFile(file);
    for (let line of fileRead.split("\n")) {
      let lineDate = new Date(Number(line));
      if (lineDate.getDay() === day) {
        result[lineDate.getHours()] += 1;
      }
    }
  }

  return result;
}

activityTable(1)
  .then(table => console.log(activityGraph(table)));