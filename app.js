import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import session from 'express-session'
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import testAPIRouter from './routes/testAPI.js';
import google from './routes/google.js';
import googleCallback from './routes/googleCallback.js';
import requestToken from './routes/requestToken.js';
import { fileURLToPath } from 'url';
import passport from 'passport'
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import './lib/passport.js'


var app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(session({
  secret: process.env.PRIVATE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
app.use(passport.session());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/auth/google", google);
app.use("/auth/google/callback", googleCallback);
app.use("/auth/token/request", requestToken);

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

export default app;
