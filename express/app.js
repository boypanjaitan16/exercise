var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var cors          = require('cors')

var webRouter = require('./routes/web');
var apiRouter = require('./routes/api');
var {responseError} = require('./src/helpers/authHelper')

var app = express();
var db  = require('./db')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors({
  origin  : ['http://127.0.0.1:5000', 'http://127.0.0.1:8000', 'http://127.0.0.1:3000', 'https://boy-activity-tracker.netlify.app'],
  credentials : true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', webRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if(req.headers['accept'] === 'application/json'){
    responseError(res, err, err.status || 500)
    return;
  }
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
