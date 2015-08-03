'use strict';

var User = require('../index.js')
  , mongoose = require('mongoose')
  , should = require('should');

var data, token, update;

describe('User', function () {
  before(function(done){
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/testing', done);

    data = {
      displayname: 'TestUser',
      password: '12351235',
      email: 'test@user.io'
    }
  });

  it('Create', function(done){
    var user = new User(data);
    user.create(function(code, item){
      code.should.equal(201);
      item.displayname.should.equal(data.displayname);
      item.email.should.equal(data.email);
      done();
    })
  });

  it('Login', function(done){
    var user = new User(data);
    user.login(function(code, item){
      code.should.equal(200);
      item.displayname.should.equal(data.displayname);
      item.email.should.equal(data.email);
      item.token.should.be.type('string');
      token = item.token;
      done();
    })
  });

  it('Read', function(done){
    var user = new User({ token: token });
    user.read(function(code, item){
      code.should.equal(200);
      item.displayname.should.equal(data.displayname);
      item.email.should.equal(data.email);
      done();
    });
  });

  it('Update', function(done){
    update = {
      token: token,
      email: 'test@user.de'
    };
    var user = new User(update);
    user.update(function(code, item){
      code.should.equal(200);
      item.displayname.should.equal(data.displayname);
      item.email.should.equal(update.email);
      done();
    })
  });

  it('Read Update', function(done){
    var user = new User({ token: token });
    user.read(function(code, item){
      code.should.equal(200);
      item.email.should.equal(update.email);
      done();
    });
  });

  it('Update', function(done){
    update = {
      token: token,
      email: 'test@user.io'
    };
    var user = new User(update);
    user.update(function(code, item){
      code.should.equal(200);
      item.displayname.should.equal(data.displayname);
      item.email.should.equal(update.email);
      done();
    })
  });

  it('Logout', function(done){
    var user = new User({ token: token });
    user.logout(function(code){
      code.should.equal(200);
      done();
    });
  });

  it('Check Logout', function(done){
    var user = new User({ token: token });
    user.logout(function(code){
      code.should.equal(400);
      done();
    });
  });

  it('Login for Delete', function(done){
    var user = new User({ displayname: 'TestUser', password: '12351235'});
    user.login(function(code, item){
      code.should.equal(200);
      item.displayname.should.equal(data.displayname);
      item.email.should.equal(data.email);
      item.token.should.be.type('string');
      token = item.token;
      done();
    })
  });

  it('Delete', function(done){
    var user = new User({ token: token });
    user.delete(function(code){
      code.should.equal(200);
      done();
    })
  });

  it('Check Delete', function(done){
    var user = new User({ displayname: data.displayname });
    user.read(function(code){
      code.should.equal(400);
      done();
    });
  })

});