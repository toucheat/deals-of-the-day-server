var express = require('express');
var app = express();
var db = require('./db_connect_info');

var UserController = require('./user/UserController');
app.use('/users', UserController);

var infoController = require('./product/infoController');
app.use('/info', infoController);

var productSearch = require('./productSearch/search');
app.use('/productsearch', productSearch);

var mallList = require('./mallList/mallList');
app.use('/malllist', mallList);

var pinfo = require('./pinfo/pinfo');
app.use('/pinfo', pinfo);

var favoriteCount = require('./favoriteCount/favoriteController');
app.use('/favorite', favoriteCount);

module.exports = app;