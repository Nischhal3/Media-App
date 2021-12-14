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
const allLikesRoute = require('./routes/allLikesRoute');
const likeRoute = require('./routes/likeRoute');

app.use(passport.initialize());
app.use(express.static('uploads'));
app.use('/thumbnails', express.static('thumbnails'));

app.use('/auth', authRoute);
app.use('/collection', collectionRoute);
app.use('/image/collection', imageCollectionRoute);
app.use('/like/image', allLikesRoute);
app.use('/comments/image', allCommentsRoute);

//Authentication
app.use(
  '/image/user',
  passport.authenticate('jwt', { session: false }),
  imageUserRoute
);

app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);
app.use(
  '/image/comment',
  passport.authenticate('jwt', { session: false }),
  commentRoute
);
app.use(
  '/like/user',
  passport.authenticate('jwt', { session: false }),
  likeRoute
);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'internal error' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
