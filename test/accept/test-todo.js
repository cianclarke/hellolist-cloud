var proxyquire = require('proxyquire');
var assert = require('assert');
var supertest = require('supertest');
var express = require('express');
var sinon = require('sinon');
var request, 
createStub = sinon.stub(), 
readStub = sinon.stub(), 
updateStub = sinon.stub(), 
deleteStub = sinon.stub(), 
listStub = sinon.stub();

// Sample setUp call - note this is called once, before the other tests in this file are run
exports.setUp = function(finish) {
  var app = express();
  
  var todo = proxyquire('routes/todo.js', {
    '../lib/todo' : {
      create : createStub,
      read : readStub,
      update : updateStub,
      delete : deleteStub,
      list: listStub
    }
  })();
  app.use('/todo', todo);
  request = supertest(app);
  finish();
};

// Sample tearDown - note this is called once, after all other tests have been run in this file
exports.tearDown = function(finish) {
  finish();
};

exports.it_should_test_todo_CREATE = function(finish) {
  createStub.yields(null, { name : 'foo' });
  request.post('/todo')
  .expect(200)
  .expect('Content-Type', /json/)
  .send({ name : 'foo '})
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(res.body);
    finish();
  });
};

exports.it_should_test_todo_READ = function(finish) {
  readStub.yields(null, { name : 'foo' });
  request.get('/todo/0')
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(res.body);
    finish();
  });
};

exports.it_should_test_todo_UPDATE = function(finish) {
  updateStub.yields(null, { name : 'foo' });
  request.put('/todo/0')
  .expect(200)
  .expect('Content-Type', /json/)
  .send({ name : 'foo '})
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(res.body);
    finish();
  });
};

exports.it_should_test_todo_DELETE = function(finish) {
  deleteStub.yields(null, {});
  request.del('/todo/0')
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(res.body);
    finish();
  });
};

exports.it_should_test_todo_LIST = function(finish) {
  listStub.yields(null, { name : 'foo' });
  request.get('/todo')
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function(err, res) {
    assert.ok(!err);
    assert.ok(res.body);
    finish();
  });
};
