import './db';
import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';
import bodyParser from 'body-parser';
import {loadUsers, loadMovies} from './seedData';
import usersRouter from './api/users';
import session from 'express-session';
<<<<<<< HEAD
import passport from './authenticate';
import genresRouter from './api/genres';
=======
import passport from './authenticate'
>>>>>>> 75d34e9c79dc1ff46fbb8770b09dcf8a96eaa74e
dotenv.config();
const errHandler = (err, req, res, next) => {
  /* if the error in development then send stack trace to display whole error,
  if it's in production then just send error message  */
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍, ${err.stack} `);
};
const app = express();

const port = process.env.PORT;
if (process.env.SEED_DB) {
  loadUsers();
  loadMovies();
}
app.use(express.static('public'));
app.use('/api/movies', moviesRouter);
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(errHandler);
app.use(session({
  secret: 'ilikecake',
  resave: true,
  saveUninitialized: true
}));
app.use('/api/users', usersRouter);
app.use('/api/movies', passport.authenticate('jwt', {session: false}), moviesRouter);
<<<<<<< HEAD
app.use('/api/users', genresRouter);
=======
>>>>>>> 75d34e9c79dc1ff46fbb8770b09dcf8a96eaa74e
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});