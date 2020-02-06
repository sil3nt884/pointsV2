const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')


let getData = require('./routes/data')
let add = require('./routes/add')
let rotaGet = require('./routes/rota')
let sub = require('./routes/sub.js')
let push  = require('./routes/push')
let addStar = require('./routes/addStar')
let loadStars = require('./routes/loadStars')
let takeawayStars = require('./routes/takeawayStars')
let menu  = require('./routes/menu')
let jobs = require('./jobs')

const  app = express();

app.use('/data', getData)
app.use('\/[a-z]+add',add)
app.use('\/[a-z]+takeaway',add)
app.use('/rota', rotaGet)
app.use('/subscription', sub)
app.use('/push', push)
app.use('/addStar', addStar)
app.use('/stars', loadStars)
app.use('/takeawayStar',takeawayStars)
app.use('/menu', menu)
app.use('/savemenu', menu)

app.use(logger((tokens, req, res)=>{
	return JSON.stringify( {
	  method : tokens.method(req, res),
		url : tokens.url(req, res),
	  ip : req.connection.remoteAddress,
		headers : req.headers,
	  status: tokens.status(req, res),
 }, null, 1)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, '/var/www/html/admim')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

jobs();


module.exports = app;
