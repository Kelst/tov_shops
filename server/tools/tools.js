const mysql = require('mysql2');
const config = require('../config.js'); 
const dbConfig = {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.db
  };
const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database Billing');
  }
});
async function queryDatabase(sql){
  


  const data=await new Promise((resolve, reject) => {
    connection.query(sql, function(err, results) {
      if (err) {
        reject(err);
      } else 
      { 
           resolve(results);
      }
    });
  });
//  await connection.close()


 return data
  
}

module.exports=queryDatabase