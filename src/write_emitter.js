var assert = require('assert');
var EventEmitter = require('eventemitter2').EventEmitter2;
var inherits = require('util').inherits;


var WriteEmitter = module.exports = function(stream, opts){
  if(!(this instanceof WriteEmitter)) return new WriteEmitter(stream, opts);
  EventEmitter.call(this, opts);
  this._stream = stream;
};

inherits(WriteEmitter, EventEmitter);

var localEmit = WriteEmitter.prototype.emit;
WriteEmitter.prototype.emit = function emit() {
  if (!this._stream.writable) return;

  var message = JSON.stringify(Array.prototype.slice.apply(arguments)) + '\n';
  this._stream.write(message);
  localEmit.apply(this, arguments);
};