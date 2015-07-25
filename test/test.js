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

  it('Delete', function(done){
    var user = new User({ token: token });
    user.delete(function(code){
      code.should.equal(200);
      done();
    })
  });

  it('Check Delete', function(done){
    var user = new User({ token: token });
    user.read(function(code){
      code.should.equal(400);
      done();
    });
  })

});