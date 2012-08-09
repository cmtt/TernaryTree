function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
  return 'AssertException: ' + this.message;
}

function assert(exp, message) {
  if (!exp) {
    throw new AssertException(message);
  }
}

var words = ['Aarhus','Aaron','Ababa','abacus','abalone','abandon'];

var Tree = new TernaryTree();

assert(Tree.length === 0,'Tree length === 0');

words.forEach(function(w) {
  Tree.insert(w);
});

assert(Tree.length === words.length,'Tree length === ' + words.length);

Tree.contains('A', function (err,nodes) {
  var vals = _.pluck(nodes,'value');
  assert(nodes.length === 3,'Tree.contains provides 3 results');
  assert(vals.join('/') === 'Aarhus/Aaron/Ababa','Tree.contains provives Aarhus,Aaron,Ababa');
});

Tree.contains('a', function (err,nodes) {
  console.log(nodes)
  assert(nodes.length === 3,'contains provides Aarhus,Aaron,Ababa');
  var vals = _.pluck(nodes,'value');
  assert(nodes.length === 3,'Tree.contains provides 3 results');
  assert(vals.join('/') === 'abacus/abalone/abandon','Tree.contains provives abacus,abalone,abandon');
});

Tree.search('aarhus', function (err,node) {
  assert(node === null,'search should return nothing for aarhus');
});

Tree.search('abalone', function (err,node) {
  assert(node.value === 'abalone','search finds abalone');
});

Tree.search('abacus', function (err,node) {
  assert(node.value === 'abacus','search finds abacus');
});

Tree.similarSearch('Aar', 1,function (err,nodes) {
  var vals = _.pluck(nodes,'value').join('/');
  assert(nodes.length === 1,'Tree.similarSearch provides one result for Aar, distance = 1');
  assert(vals === 'Aaron','Tree.similarSearch provides Aaron for Aar, distance = 1');
});

Tree.similarSearch('Aal', 1,function (err,nodes) {
  var vals = _.pluck(nodes,'value').join('/');
  assert(nodes.length === 0,'Tree.similarSearch provides no result for Aal, distance = 1');
  assert(vals === '','Tree.similarSearch provides no result for Aal, distance = 1');
});

Tree.similarSearch('Aal', 2,function (err,nodes) {
  var vals = _.pluck(nodes,'value').join('/');
  assert(nodes.length === 1,'Tree.similarSearch provides o1ne result for Aal, distance = 2');
  assert(vals === 'Aaron','Tree.similarSearch provides Aaron for Aal, distance = 2');
});

Tree.similarSearch('Aar', 2,function (err,nodes) {
  var vals = _.pluck(nodes,'value').join('/');
  assert(nodes.length === 2,'Tree.similarSearch provides 2 results for Aar, distance = 2');
  assert(vals === 'Aarhus/Aaron','Tree.similarSearch provides Aarhus/Aaron for Aar, distance = 2');
});

Tree.similarSearch('Aar', 3,function (err,nodes) {
  var vals = _.pluck(nodes,'value').join('/');
  assert(nodes.length === 3,'Tree.similarSearch provides 3 results for Aar, distance = 3');
  assert(vals === 'Aarhus/Aaron/Ababa','Tree.similarSearch provides Aarhus/Aaron for Aar, distance = 3');
});

