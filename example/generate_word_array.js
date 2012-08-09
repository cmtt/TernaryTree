var fs = require('fs');
var wordArray = [];

fs.readFile('./most-used-words.txt', function (err, buffer) {
  var str = buffer.toString();
  var lines = str.split(/\n/);
  var wordCount = 0;
  lines.forEach(function(l) {
    if (l.charAt(0) === '/') return;
    if (wordArray.indexOf(l) !== -1) return;
    ++wordCount;
    wordArray.push(l);
  });

  fs.writeFile('./words.json', JSON.stringify(wordArray), function () {
    console.log(['Saved ',wordCount,' words to words.json'].join(''));
  });
});
