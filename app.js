var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const port = 46500;
var net = require('net');
var connect;

var router = express.Router();

var index = require('./routes/index');
var users = require('./routes/users');
//var enviar = require('./routes/enviarmsg');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/enviarmsg', router);

router.post('/', function(req, res, next) {
    console.log(req.body.msg);
    var msg = req.body.msg;
    connect.write(msg)
    res.send('se envio mensaje');


});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;


var server = net.createServer(function(connection) {
    console.log('client connected');
    connect = connection;
    connection.on('close', function (){
        console.log('client disconnected');
    });

    connection.on('data', function (data) {
        data = data.toString();
        console.log('client sended the folowing string:'+data);
        connection.write("Response");
        console.log('Sended responst to client');
        //connection.end();
        //console.log('Disconnected the client.');
    });

});


server.listen(port, function () {
    console.log('server is listening');
});

