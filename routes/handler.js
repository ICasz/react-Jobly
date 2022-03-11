const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
//app.use(cors());
router.use(cors());

var {Pool} = require('pg');
//const { default: reportWebVitals } = require('../client/src/reportWebVitals');
var pool;
pool = new Pool ({
  //connectionString: 'postgres://postgres:root@localhost/users'
  connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
  }
})

router.post('/login', (req, res) => {
    console.log("Requested");
    var email = req.body.email;
    var password = req.body.password;
    var getQuery = `select * from users where email = '${email}' and password = '${password}';`;
    console.log("Query = " + getQuery);
    pool.query(getQuery, (error, result) => {
        if (error) {
            res.end(error);
        }
        else {
            var results = {'users': result.rows}
            res.send(JSON.stringify(results.users[0]));
        }
    })
});

router.post('/addUser', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    //var checkQuery = `select * from users where email = '${email}';`
    var getQuery = `insert into users values('${name}','${email}','${password}');`
    // pool.query(checkQuery, (error, result) => {
    //     if (error) {
    //       res.end(error);
    //     }
    //     else {
    //       var results = {'user': result.rows}
    //       if (email == result.rows[0].email){
    //         res.end ("Email already exists");
    //       }
    //     }
    // })
    pool.query(getQuery, (error, result) => {
        if (error) {
            res.end(error);
        }
        else {
            console.log("Inserted new user")
            res.end();
        }
    })
});

module.exports=router;
