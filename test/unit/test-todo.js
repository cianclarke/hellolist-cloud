var proxyquire = require('proxyquire');
var assert = require('assert');
var sinon = require('sinon');
var dbStub = sinon.stub();
var typeName = "todo";
var todo;

// Sample setUp call - note this is called once, before the other tests in this file are run
exports.setUp = function(finish) {
  todo = proxyquire('lib/todo.js', {
    'fh-mbaas-api' : {
      db : dbStub
    }
  });
  finish();
};

// Sample tearDown - note this is called once, after all other tests have been run in this file
exports.tearDown = function(finish) {
  finish();
};

exports.it_should_create_todos = function(finish) {
  var name = "foo";
  dbStub.yields(null, {});
  todo.create(name, function(){
    var createArgs = dbStub.getCall(0).args[0];
    assert.ok(createArgs.type === typeName);
    assert.ok(createArgs.act === "create");
    assert.ok(createArgs.fields.name === name);
    finish();
  });
};

exports.it_should_read_todos = function(finish) {
  var id = "0";
  dbStub.yields(null, {});
  todo.read(id, function(){
    var readArgs = dbStub.getCall(1).args[0];
    assert.ok(readArgs.act === "read");
    assert.ok(readArgs.type === typeName);
    assert.ok(readArgs.guid === id);
    finish();
  });
};

exports.it_should_update_todos = function(finish) {
  var name = "foo2";
  var id = "1";
  dbStub.yields(null, {});
  todo.update(id, name, function(){
    var updateArgs = dbStub.getCall(2).args[0];
    assert.ok(updateArgs.act === "update");
    assert.ok(updateArgs.type === typeName);
    assert.ok(updateArgs.guid === id);
    assert.ok(updateArgs.fields.name === name);
    finish();
  });
};



exports.it_should_delete_todos = function(finish) {
  var id = "3";
  dbStub.yields(null, {});
  todo['delete'](id, function(){
    var deleteArgs = dbStub.getCall(3).args[0];
    assert.ok(deleteArgs.act === "delete");
    assert.ok(deleteArgs.type === typeName);
    assert.ok(deleteArgs.guid === id);
    finish();
  });
};

exports.it_should_list_todos = function(finish) {
  dbStub.yields(null, {});
  todo.list(function(){
    var listArgs = dbStub.getCall(4).args[0];
    assert.ok(listArgs.act === "list");
    assert.ok(listArgs.type === typeName);
    finish();
  });
};
