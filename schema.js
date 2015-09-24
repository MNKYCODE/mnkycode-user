'use strict'

var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var user = new Schema({
  displayname: String,
  username: String,
  email: String,
  password: String,
  token: String,
  signup: { type: Date, default: Date.now() },
  rights: {
    user: {
      login: { type: Boolean, default: true },
      dashboard: { type: Boolean, default: true },
      list: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      edit: { type: Boolean, default: false }
    },
    blog: {
      dashboard: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      list: { type: Boolean, default: false },
      edit: { type: Boolean, default: false }
    }
  }
});

module.exports = mongoose.model('users', user);
