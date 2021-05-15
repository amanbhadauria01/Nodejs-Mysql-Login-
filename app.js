const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({path : './.env'});

const db = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('Mysql connected');
    }
})
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.set('view engine','hbs');

app.get("/",(req,res)=>{
    res.render("index.hbs");
})

app.listen(3000,()=>{
    console.log("Server started");
})