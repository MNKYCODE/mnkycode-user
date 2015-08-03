'use strict'

var db = require('./schema')
    , crypto = require('crypto')
    , jwt = require('jsonwebtoken');

function User(data){
  if(data.displayname){
    this.displayname = data.displayname;
    this.username = data.displayname.toLowerCase();
  }

  if(data.displayname && data.password){
    this.password = crypto.pbkdf2Sync(data.password, data.displayname.toLowerCase(), 4096, 512/4, 'sha256').toString('hex');
  }
  if(data.email){
    this.email = data.email;
  }
  if(data.token){
    this.token = data.token;
  }
  if(data){
    this.data = data;
  }
}

User.prototype.create = function(cb){
  var _this = this;

  var callback = function(err, item){
    if(err) throw err;
    if(item[0]){
      cb(200, null);
    }else{
      var newUser = new db();
      newUser.displayname = _this.displayname;
      newUser.username = _this.username;
      newUser.email = _this.email;
      newUser.password = _this.password;
      newUser.save(save);
    }
  };

  var save = function(err, item){
    if(err) throw err
    cb(201, item);
  };

  db.
      find({ username: _this.username }).
      limit(1).
      exec(callback);
};

User.prototype.read = function(cb){
  var _this = this;

  var callback = function(err, item){
    if(item[0]){
      cb(200, item[0]);
    }else{
      cb(400, null);
    }
  };

  db.
      find({ $or: [ { token: _this.token }, { username: _this.username }, { displayname: _this.displayname }, { email: _this.email } ] }, { password: 0 }).
      limit(1).
      exec(callback);

};

User.prototype.update = function(cb){
  var _this = this;

  var callback = function(err, item){
    if(err) throw err;
    if(item[0]){
      if(_this.email) item[0].email = _this.email;
      if(_this.password) item[0].password = _this.password;
      item[0].save(save);
    }else{
      cb(400, null);
    }
  }

  var save = function(err, item){
    if(err) throw err;
    cb(200, item);
  }

  db.
      find({ token: _this.token }).
      limit(1).
      exec(callback);

};

User.prototype.delete = function(cb){
  var _this = this;

  var callback = function(err){
    if(err) throw err;
    cb(200, null)
  };

  db.
      findOne({ token: _this.token }).
      remove(callback);

};

User.prototype.login = function(cb){
  var _this = this;


  var callback = function(err, item){
    if (err) throw err;
    if(item[0]){
      delete _this.data.password;
      item[0].token = jwt.sign(_this.data, _this.password);
      item[0].save(save);
    }else{
      cb(400, null);
    }
  };

  var save = function(err, item){
    if (err) throw err;
    cb(200, item);
  }

  db.
      find({ username: _this.username, password: _this.password }, { password: 0 }).
      limit(1).
      exec(callback);

};

User.prototype.logout = function(cb){
  var _this = this;

  var callback = function(err, item){
    if (err) throw err;
    if(item[0]){
      item[0].token = '';
      item[0].save(save);
    }else{
      cb(400, null);
    }
  };

  var save = function(err, item){
    if (err) throw err;
    cb(200, item);
  }

  db.
      find({ token: _this.token }).
      limit(1).
      exec(callback);

};

// Export Database Schema
User.prototype.Schema = db;

// Export User Prototype
module.exports = User;


