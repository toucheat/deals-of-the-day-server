var express = require('express');
var app = express();
var db = require('./db_connect_info');

var UserController = require('./user/UserController');
app.use('/users', UserController);

module.exports = app;