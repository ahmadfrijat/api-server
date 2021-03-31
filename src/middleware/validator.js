'use strict';

module.exports = (req, res, next) => {
  if (!req.params.id) {
    next('Invalid food ID');
  } else {
    next();
  }
};