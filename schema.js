'use strict'

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var user = new Schema({
  displayname: String,
  username: String,
  email: String,
  password: String,
  token: String,
  signup: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('users', user);