var express = require('express');
var app = express();
var db = require('./db_connect_info');

var UserController = require('./user/UserController');
app.use('/users', UserController);

var infoController = require('./product/infoController');
app.use('/info', infoController);

module.exports = app;