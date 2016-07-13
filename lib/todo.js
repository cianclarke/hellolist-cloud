var fh = require('fh-mbaas-api');

module.exports = {
  create : function(itemName, cb){
    return fh.db({
      act : 'create', 
      type : 'todo', 
      fields : { name : itemName }
    }, cb);
  },
  read : function(idToRead, cb){
    return fh.db({
      act : 'read',
      type : 'todo',
      guid : idToRead
    }, cb);
  },
  update : function(idToUpdate, updatedName, cb){
    return fh.db({
      act : 'update',
      type : 'todo',
      guid : idToUpdate,
      fields : { name : updatedName }
    }, cb);
  },
  delete : function(idToDelete, cb){
    return fh.db({
      act : 'delete',
      type : 'todo',
      guid : idToDelete
    }, cb);
  },
  list : function(cb){
    return fh.db({
      act : 'list',
      type : 'todo'
    }, cb);
  }
};
