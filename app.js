var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

var indexRouter = require('./routes/index');

//Login Router
var loginRouter = require('./routes/login');

//Register Router
var registerRouter = require('./routes/register');

//UploadSingleMedia Router
var uploadSingleMediaRouter = require('./routes/uploadSingleMedia');

//UploadMultipleMedia Router
var uploadMultipleMediaRouter = require('./routes/uploadMultipleMedia');

//myMedia Router
var myMediaRouter = require('./routes/myMedia')

//follower Router
var followerRouter = require('./routes/followers')

//account Router
var accountRouter = require('./routes/account')

//blockedaccount Router
var blockedaccountRouter = require('./routes/blockedaccounts')

//accountUpdate Router
var accountUpdateRouter = require('./routes/accountUpdate')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/uploadSingleMedia', uploadSingleMediaRouter);
app.use('/uploadMultipleMedia', uploadMultipleMediaRouter);
app.use('/myMedia', myMediaRouter);
app.use('/followers', followerRouter);
app.use('/account', accountRouter);
app.use('/blockedaccounts', blockedaccountRouter);
app.use('/accountUpdate',accountUpdateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

let configureJwtPassport = require('./utility/jwt-passport');
configureJwtPassport(passport => {
  app.use(passport.initialize());
});

module.exports = app;
