const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000
const routesHandler = require('./routes/handler.js')

const {Pool} = require('pg');
var pool;
pool = new Pool ({
  //connectionString: 'postgres://postgres:root@localhost/users'
  connectionString: process.env.DATABASE_URL
    ssl: {
      rejectUnauthorized: false
  }
})

const router = express.Router();

var app = express()
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', routesHandler);

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/homepage'))

app.post('/update', (req, res) => {
  var getUserQuery = req.body.code;
  console.log(getUserQuery);
  pool.query(getUserQuery, (error, result) => {
    if (error)
      res.end(error);
    res.sendStatus(200);
  })
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
