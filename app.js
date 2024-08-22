import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
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
import editSet from './routes/editSet.js';
import deleteCard from './routes/deleteCard.js';
import addUserToViewSet from './routes/addUserToViewSet.js';
import getUserViewList from './routes/getUserViewList.js';
import removeUserToViewSet from './routes/removeUserToViewSet.js';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import createUser from './routes/createUser.js'
dotenv.config({ path: '.env.local' });
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 seconds
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
})

var app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(limiter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api/username', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/api/auth/token/request", requestToken);
app.use("/api/auth/token/refresh", refreshToken);
app.use("/api/set/create", createSet);
app.use("/api/sets/get", getSets);
app.use("/api/username/update", updateUsername)
app.use("/api/sets/flashcards/get", getFlashcardsForSet)
app.use("/api/set/delete", deleteSet);
app.use("/api/set/edit", editSet);
app.use("/api/card/delete", deleteCard);
app.use("/api/user/create", createUser);
app.use("/api/set/view/users", getUserViewList);
app.use("/api/set/view/users/remove", removeUserToViewSet);
app.use("/api/set/view/users/add", addUserToViewSet);

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
