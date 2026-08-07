function Promise_all(promises) {
  if (promises.length === 0) {
    return Promise.resolve([]);
  }
  
  return new Promise((resolve, reject) => {
    // Your code here.
    let result = [];

    promises[0]?.then(value => {
      result.push(value);
      return promises[1].then(value => {
        result.push(value);
        return promises[2].then(value => {
          result.push(value);
          resolve(result);
        })
      })
    }).catch(error => reject(error));
    
    // for (let i = 0; i < nbrPromises; i++) {
    //   promises[i].then(value => {result[i] = value; console.log(result);});
    // }

    // if (result.length === nbrPromises) {
    //   resolve(result);
    // }

  });
}

// Test code.
Promise_all([]).then(array => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then(array => {
    console.log("We should not get here");
  })
  .catch(error => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    } else {
      console.log("Caught:", error);
    }
  });