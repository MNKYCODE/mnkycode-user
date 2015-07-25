# MNKYCODE - User Module

[![Build Status](https://travis-ci.org/HashDot/mnkycode-user.svg?branch=master)](https://travis-ci.org/HashDot/mnkycode-user)

## Install

````
  npm install -S mnkycode-user
````

## Requirements

You need a running mongoose instance like:

````
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/testing', {}, function (err) {
  if(err) throw err;
});
````


## Usage

#### Create User

````
	var User = require('mnkycode-user')
    var data = {
      displayname: TestUser,
      password: 12351235,
      email: test@test.com
    }
    var user = new User(data)
    user.create(function(code, data){
      // on success 
      //   code = 201
      //   data = json object 
      // on exist
      //    code = 200
      //    data = null
    })
````

#### Read User

````
	var User = require('mnkycode-user')
	var data = {
      token: UserToken
    }
    var user = new User(data)
    user.read(function(code, data){
      // on success 
      //   code = 200
      //   data = json object 
      // on error
      //    code = 400
      //    data = null
    })
````

#### Update User

````
	var User = require('mnkycode-user')
	var data = {
      token: UserToken,
      email: 'new@email.com',
      password: 'newMasterPassword'
    }
    var user = new User(data)
    user.update(function(code, data){
      // on success 
      //   code = 200
      //   data = json object 
      // on error
      //    code = 400
      //    data = null
    })
````

#### Delete User

````
	var User = require('mnkycode-user')
	var data = {
      token: UserToken
    }
    var user = new User(data)
    user.update(function(code, data){
      // on success 
      //   code = 200
      //   data = json object 
      // on exist
      //    code = 400
      //    data = null
    })
````


## Schema

| Name          | Type          | Description  |
| ------------- |:-------------:| -----:|
| displayname   | String		 | - |
| username      | String	     |   displayname.toLowerCase() |
| email			| String      |    - |
| password		| String      |    pbkdf2 |
| token			| String      |    JWT |
| signup		| Date      |    Date.now() |





## Test

````
npm test
````