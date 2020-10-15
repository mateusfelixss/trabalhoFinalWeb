const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/e-comerse', { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.Promise = global.Promise;

module.exports = mongoose;