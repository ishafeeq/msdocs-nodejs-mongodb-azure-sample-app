const mongoose = require('mongoose');

const appSchema = new mongoose.Schema({
  appName: {
    type: String,
    trim: true,
  },
  appRuntime: String,
  createDate: Date,
  status: String,
  completed: Boolean
});

module.exports = mongoose.model('Application', appSchema);