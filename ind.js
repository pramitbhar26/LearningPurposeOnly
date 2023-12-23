const express = require('express')
const fs= require('fs')
const app=express();

fs.readFile("pramit.txt","utf-8",(err, data) =>{
     console.log(data);
})

// app.listen(3000);