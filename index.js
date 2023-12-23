 const express = require('express');
 const bodyParser = require('body-parser');
const app=express();
 const port = 3000;
 app.use(bodyParser.json());

 function calculateSum(counter) {
    var sum=0;
    for(var i=1;i<=counter;i++) {
        sum+=i;
    }
    return sum;
}
function handleFirstSum(req, res) {
    var counter = req.query.counter;
    var sum = calculateSum(counter);
    var answerObject ={
        TotalSum: sum,
    }
    res.send(answerObject);
}

app.get("/handleSum", handleFirstSum);

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
  });