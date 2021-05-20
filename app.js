const express = require('express');
const app = express();
const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
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
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.set('view engine','hbs');

app.use('/',require('./routes/pages.js'));
app.use('/auth',require('./routes/auth.js'));
app.listen(3000,()=>{
    console.log("Server started at 3000");
})