const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');
const users = require('./users.json');

app.use(express.json({limit: '50mb'}));

app.use(express.json())
app.use(cors({
  origin :'*'
}))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.get("/",async(req,res)=>{
    try {
      res.json('Server running....')
    } catch (err) {
      console.log(err)
      res.status(500).json(`ERROR : $${err.message}`)
    }
  })
  const PORT = 8000;
  app.listen(PORT,()=>{
      console.log(`server running on ${PORT}`)
  })

  app.post("/add",async(req,res)=>{
    try {
      res.setHeader("Access-Control-Allow-Origin", "*")
      let user = req.body;
      console.log(user, 'user');
      users.push(user);
      fs.writeFile("users.json", JSON.stringify(users), err => {
          console.log('User Added Successfully');
      })
    } catch (err) {
      console.log(err);
    }
  })

  app.get("/data",async(req,res)=>{
    try {
      res.setHeader("Access-Control-Allow-Origin", "*")
      fs.readFile("users.json", function(err, data) {
          const read = JSON.parse(data);
          console.log(read, 'User Data');
          res.json(read)
          console.log(res, 'res')
      })
    } catch (err) {
      console.log(err);
    }
  })

