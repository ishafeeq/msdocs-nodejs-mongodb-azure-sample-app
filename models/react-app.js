const mongoose = require('mongoose');

const reactAppSchema = new mongoose.Schema({
  appName: {
    type: String,
    trim: true,
  },
  appRuntime: String,
  createDate: Date,
  status: String,
  completed: Boolean
});

module.exports = mongoose.model('ReactApplication', reactAppSchema);