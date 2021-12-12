const unless = (path) => {
  return (req, res, next) => {
    if (req.path.includes(path)) {
      return next();
    } else {
      return passport.authenticate('jwt', { session: false });
    }
  };
};

module.exports = unless;
