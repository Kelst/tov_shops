const express = require('express');
const app = express();
const http = require('http');
const axios=require("axios")
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const config = require('./config.js'); 
const router=require("./router/index")

const cors = require('cors'); // Подключаем пакет cors



app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin:[ 'https://shop-int-telegram.pp.ua','http://194.8.147.150:4002','http://localhost:5173','http://localhost:5175','https://shop-intelekt.pp.ua','http://shop-intelekt.pp.ua:4003','https://shop-int-telegram.pp.ua/:1','https://shop-int-telegram.pp.ua/'], // Замість '*' вкажіть джерело (origin), з якого надходять запити
  credentials: true,
}));
app.use(express.json())

  const port = 4001; 
  const dbConfig = {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.db
  };
  app.use("/api",router)

  // const connection = mysql.createConnection(dbConfig);
  // connection.connect((err) => {
  //   if (err) {
  //     console.error('Error connecting to database:', err);
  //   } else {
  //     console.log('Connected to database Billing');
  //   }
  // });
  // connection.end(function (err) {
  //   if (err) {
  //     console.error('Помилка розриву з\'єднання: ' + err.message);
  //   } else {
  //     console.log('З\'єднання розірвано.');
  //   }
  // });

  app.listen(port, () => {
    console.log(`Tovar Server is running on http://localhost:${port}`);
  }); 