
var MemDB = function () {
  this.data = {};
}

MemDB.prototype.insert = function ( id, data ) {
  this.data.id = data;
}

MemDB.prototype.find = function ( id ) {
  return this.data.id;
}

module.exports = new MemDB();
