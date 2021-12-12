'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const passport = require('./utils/passport');

const authRoute = require('./routes/authRoute.js');
const userRoute = require('./routes/userRoute');
const imageCollectionRoute = require('./routes/imageCollectionRoute');
const collectionRoute = require('./routes/collectionRoute');
const imageUserRoute = require('./routes/imageUserRoute');
const allCommentsRoute = require('./routes/allCommentsRoute');
const commentRoute = require('./routes/commentRoute');

app.use(passport.initialize());
app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

app.use('/auth', authRoute);
app.use('/collection', collectionRoute);
app.use('/image/collection', imageCollectionRoute);
app.use(
  '/image/user',
  passport.authenticate('jwt', { session: false }),
  imageUserRoute
);
app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);
app.use('/comments/image', allCommentsRoute);
app.use(
  '/comment/user',
  passport.authenticate('jwt', { session: false }),
  commentRoute
);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'internal error' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
