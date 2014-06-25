var split = require('split2');
var through = require('through2');

module.exports = function(){
  var stream = split().pipe(through.obj(parseJSON));

  function parseJSON(chunk, enc, fn){
    if(!chunk) return fn();

    try {
      chunk = JSON.parse(chunk)
    } catch(err) {
      return stream.emit('error', err);
    }

    this.push(chunk);
    fn();
  }

  return stream;
};