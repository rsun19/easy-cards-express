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
import requestToken from './routes/requestToken.js';
import refreshToken from './routes/refreshToken.js';
import createSet from './routes/createSet.js';
import getSets from './routes/getSets.js';
import deleteSet from './routes/deleteSet.js';
import getFlashcardsForSet from './routes/getFlashcardsForSet.js';
import updateUsername from './routes/updateUsername.js'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

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
app.use(session({
  secret: process.env.PRIVATE_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
app.use('/', indexRouter);
app.use('/api/username', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/auth/token/request", requestToken);
app.use("/auth/token/refresh", refreshToken);
app.use("/api/set/create", createSet);
app.use("/api/sets/get", getSets);
app.use("/api/username/update", updateUsername)
app.use("/api/sets/flashcards/get", getFlashcardsForSet)
app.use("/api/set/delete", deleteSet);

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
