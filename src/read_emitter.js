var assert = require('assert');
var EventEmitter = require('eventemitter2').EventEmitter2;
var inherits = require('util').inherits;

var Parser = require('./parser');


var ReadEmitter = module.exports = function(stream, opts){
  if(!(this instanceof ReadEmitter)) return new ReadEmitter(stream, opts);
  EventEmitter.call(this, opts);
  this._stream = stream;

  var parser = Parser();
  parser.on('error', this._onerror.bind(this));

  stream.pipe(parser);
  parser.on('data', this._ondata.bind(this));
};

inherits(ReadEmitter, EventEmitter);

ReadEmitter.prototype._ondata = function(chunk){
  if(Array.isArray(chunk)) return this.emit.apply(this, chunk);
  var str = JSON.stringify(chunk, null, 2)
  this.emit('error', new Error('data should be array: %s', str));
};

ReadEmitter.prototype._onerror = function(err){
  err.message = 'Error parsing peer data: ' + err.message;
  this.emit('error', err);
};