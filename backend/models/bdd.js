const mongoose = require('mongoose');

/* ----- Your DB ------ */
const dbUrl = 'mongodb://capsule:azerty1@ds127854.mlab.com:27854/faceupapp';
/* --------------------- */

/* ----- DB Options ------ */
const options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
};

mongoose.connect(dbUrl, options, error => {
  if (error) {
    console.error(error);
  } else {
    console.log('Your database is operational...')
  }
});

module.exports = mongoose;
