var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var todoLib = require('../lib/todo');

function todoRoute() {
  var todo = new express.Router();
  todo.use(cors());
  todo.use(bodyParser());


  // REST GET: List todo entries
  todo.get('/', function(req, res) {
    return todoLib.list(function(err, listResult){
      if (err){
        return res.status(500).json(err);
      }
      return res.json(listResult);
    });
  });

  // REST POST: Create a single todo entry
  todo.post('/', function(req, res) {
    var itemName = req.body.name;
    
    if (!itemName){
      return res.status(400).json({ error : 'Todo entries must have a name' });
    }
    
    return todoLib.create(itemName, function(err, createResult){
      if (err){
        return res.status(500).json(err);
      }
      return res.json(createResult);
    });
  });
  
  // REST GET by ID: Read a single todo entry
  todo.get('/:id', function(req, res) {
    var idToRead = req.params.id;
    return todoLib.read(idToRead, function(err, readResult){
      if (err){
        return res.status(500).json(err);
      }
      return res.json(readResult);
    });
  });
  
  // PUT by ID: Update a single todo entry
  todo.put('/:id', function(req, res){
    var idToUpdate = req.params.id,
    updatedName = req.body.name;
    
    if (!updatedName){
      return res.status(400).json({ error : 'Todo entries must have a name' });
    }
    
    return todoLib.update(idToUpdate, updatedName, function(err, updateResult){
      if (err){
        return res.status(500).json(err);
      }
      return res.json(updateResult);
    });
  });
  
  // DELETE by ID: Delete a single todo entry
  todo['delete']('/:id', function(req, res){
    var idToDelete = req.params.id;
    return todoLib['delete'](idToDelete, function(err, deleteResult){
      if (err){
        return res.status(500).json(err);
      }
      return res.json(deleteResult);
    });
  });
  
  return todo;
}

module.exports = todoRoute;
