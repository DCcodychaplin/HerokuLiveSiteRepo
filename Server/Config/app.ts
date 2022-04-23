// express server functionality modules
import createError from 'http-errors';
import express, { NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// mongoDB connection module
import mongoose, {mongo} from 'mongoose';

// authentication modules
import session from 'express-session'; // user session
import passport from 'passport'; // auth 
import passportLocal from 'passport-local'; // auth strategy
import flash from 'connect-flash'; // auth messaging

// JWT modules
import cors from 'cors';
import passportJWT from 'passport-jwt';

let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

// auth objects
let localStrategy = passportLocal.Strategy;

import User from '../Models/user';

// app config
import indexRouter from '../Routes/index';
import authRouter from '../Routes/auth';
import contactListRouter from '../Routes/contact-list';

const app = express();

// DB config
import * as DBConfig from './db';
mongoose.connect(DBConfig.RemoteURI);

const db = mongoose.connection; // mongoose connection alias
db.on('error', function()
{
  console.error("connection error");
});
db.once('open', function()
{
  console.log(`Connected to MongoDB at: ${DBConfig.RemoteHost}`);
});

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors());

// express session
app.use(session({
  secret: DBConfig.SessionSecret,
  saveUninitialized: false,
  resave: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = 
{
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: DBConfig.SessionSecret
}

let strategy = new JWTStrategy(jwtOptions, function(jwt_payload, done)
{
  User.findById(jwt_payload.id)
  .then(user => { return done(null, user); })
  .catch(err => { return done(err, false); });
});

passport.use(strategy);

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', contactListRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: express.Request,  
    res: express.Response, next: NextFunction)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;