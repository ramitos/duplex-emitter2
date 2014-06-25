var test = require('tap').test;
var PassThrough = require('stream').PassThrough;
var DuplexEmitter = require('../');

test('emits events', function(t) {
  var s = new PassThrough({decodeStrings: false, encoding: 'utf8'});

  var emitter = DuplexEmitter(s);

  s.on('data', onData);

  emitter.emit('ev1', 'A', 'B');

  var evs = 0
  function onData(d) {
    evs += 1;

    if((d === '["newListener","error",null]\n') && evs === 1){
      return;
    }

    t.strictEqual(d, '["ev1","A","B"]\n');
    t.end();
  }
});