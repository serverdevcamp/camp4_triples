const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

const signInRouter = require('./routes/SignInController');
const signUpRouter = require('./routes/SignUpController');
const signOutRouter = require('./routes/SignOutController');
const verifyEmailRouter = require('./routes/VerifyEmailController');
const models = require("./models/index");
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();


models.sequelize.sync().then(()=>{
    console.log("DB 연결 성공");
}).catch(err=>{
    console.log("연결 실패");
    console.log(err);
})

const app = express();

// view engine setup
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/sign_up', signUpRouter);
app.use('/sign_in', signInRouter);
app.use('/sign_out', signOutRouter);
app.use('/verify_email',verifyEmailRouter);

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

module.exports = app;
