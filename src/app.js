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

const  app = express();

app.use('/data', getData)
app.use('\/[a-z]+add',add)
app.use('\/[a-z]+takeaway',add)
app.use('/rota', rotaGet)
app.use('/subscription', sub)
app.use('/push', push)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'html')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



module.exports = app;
