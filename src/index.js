var EventEmitter = require('eventemitter2').EventEmitter2;
var inherits = require('util').inherits;

var WriteEmitter = require('./write_emitter');
var ReadEmitter = require('./read_emitter');


var DuplexEmitter = module.exports = function(stream, opts){
  if(!(this instanceof DuplexEmitter)) return new DuplexEmitter(stream, opts);
  EventEmitter.call(this, opts);

  this.read = this.readEmitter = ReadEmitter(stream, opts);
  this.write = this.writeEmitter = WriteEmitter(stream, opts);
  this.write.on('error', this._onerror.bind(this));
};

inherits(DuplexEmitter, EventEmitter);

DuplexEmitter.prototype.once = function once(ev, fn){
  return this.read.once(ev, fn);
};

DuplexEmitter.prototype.many = function(ev, ttl, fn){
  return this.read.many(ev, ttl, fn);
};

DuplexEmitter.prototype.emit = function(){
  return this.write.emit.apply(this.write, arguments);
};

DuplexEmitter.prototype.on = function(ev, fn){
  return this.read.on(ev, fn);
};

DuplexEmitter.prototype.onAny = function(fn){
  return this.read.onAny(fn);
};

DuplexEmitter.prototype.off = function(ev, fn){
  return this.read.removeListener(ev, fn);
};

DuplexEmitter.prototype.offAny = function(fn){
  return this.read.offAny(fn);
};

DuplexEmitter.prototype.removeAllListeners = function(){
  return this.read.removeAllListeners.apply(this.read, arguments);
};

DuplexEmitter.prototype.listeners = function(ev){
  return this.read.listeners(ev);
};

DuplexEmitter.prototype.listenersAny = function(){
  return this.read.listenersAny();
};

DuplexEmitter.prototype._onerror = function(err){
  this.emit('error', err);
};

DuplexEmitter.prototype.addListener =  DuplexEmitter.prototype.on;
DuplexEmitter.prototype.removeListener = DuplexEmitter.prototype.off;