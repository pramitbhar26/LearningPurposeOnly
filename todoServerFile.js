const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const fs = require('fs');
function findInd(arr,index){
    for(var i=0;i<arr.length;i++){

        if(arr[i].id == index) return i;
    }
    return -1;
}

function removeIndex(arr,index){
    var newTodo = [];
    for(var i=0;i<arr.length;i++){
        if(i != index) newTodo.push(arr[i]);
    }
    return newTodo;
}
app.post("/todo",(req,res)=>{
    var newTodo ={
        id:Math.floor(Math.random()*100000),
        title:req.body.title,
        desc:req.body.description
    }
    fs.readFile("todo.json", "utf8",(err,data)=>{
        if(err) throw err;
        const todos = JSON.parse(data);
        todos.push(newTodo);
        fs.writeFile("todo.json", JSON.stringify(todos),(err,data)=>{
            if(err) throw err;
            res.status(201).json(newTodo);
        });
    });
})

app.get("/todo",(req,res)=>{
    fs.readFile("todo.json","utf-8",(err,data)=>{
        if(err) throw err;
        const todo = JSON.parse(data);
        res.status(200).json(todo);
    });
})


app.get("/todo/:id",(req,res)=>{
       fs.readFile("todo.json","utf-8",(err,data)=>{
        if(err) throw err;  
        const todo = JSON.parse(data);
        const findIndex =findInd(todo,req.params.id);
        console.log(req.params.id);
        if(findIndex!=-1) res.status(200).json(todo[findIndex]);
        else res.status(201).send("Id not found");
       });
});

app.delete("/todo/:id",(req,res)=>{
    fs.readFile("todo.json","utf-8",(err,data)=>{
        const todo = JSON.parse(data);
        const findIndex = findInd(todo,req.params.id);
        
        if(findIndex==-1) res.status(200).send("ID not found");

        const newTodo = removeIndex(todo,findIndex);

        fs.writeFile("todo.json",JSON.stringify(newTodo),(err,data)=>{
            if(err) throw err;
            res.status(200).json(newTodo);
        });
    });
});

// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,"index.html"));
// })
app.listen(3000);