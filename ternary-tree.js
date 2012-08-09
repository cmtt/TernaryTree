// Ternary Tree, a binary search tree 

// adapted from http://www.drdobbs.com/article/print?articleId=184410528

var  TernaryTree = (function () {

  /**
   * Constants
   */

  var ERR_EMPTY_TREE = 'Ternary Tree is empty.'
    , ERR_INVALID_STRING = 'Invalid string provided.'
    , ERR_EMPTY_STRING = 'Empty string provided.';


  /**
   * Node
   */

  var tNode = function (chr,wordEnd) {
    this.chr = chr;
    this.lft = null;
    this.center = null;
    this.rgt = null;
    this.value = null;
    this.wordEnd = wordEnd === true;
    return this;
  };

  /**
   * constructor
   */

  function TernaryTree () {
    this.rootNode = null;
    this.length = 0;
  }

  /**
   * extends the given node with the provided options
   */

  var _extend = function (node, options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        node[key] = options[key];
      }
    }
    return node;
  };

  /**
   * traverses the tree, starting from the provided node
   */

  var _traverse = function (node) {
    var foundNodes = [];

    var traverseNode = function(node) {
      if (!node) return;
      traverseNode(node.lft);
      traverseNode(node.center);
      traverseNode(node.rgt);
      if (node.wordEnd === true) {
        foundNodes.push(node);
      }
    };

    traverseNode(node);
    return foundNodes;
  };

  /**
   * inserts the given string in the tree
   */

  TernaryTree.prototype.insert = function (str, callback, options) {
      var self = this;
      options = options || {};

      if (typeof callback !== 'function') callback = null;

      if (typeof str !== 'string') {
        if (callback) callback.call(self,new Error(ERR_INVALID_STRING));
        return null;
      }

      if (str.length === 0) {
        if (callback) callback.call(self,new Error(ERR_EMPTY_STRING));
        return null;
      }

      if (self.rootNode === null) {
        self.rootNode = new tNode(str.charAt(0));
      }

      var insertChar = function(node, str, pos) {
        var c = str.charCodeAt(pos)
          , l = str.length;
        
        if (node === null) node = new tNode(str.charAt(pos));
        var cmp = node.chr.charCodeAt(0);

        if (c < cmp) {
            node.lft = insertChar(node.lft,str,pos);
        }
        else if (c > cmp) {
            node.rgt = insertChar(node.rgt,str,pos);
        } else {
          if (pos + 1 === l) {
            node = _extend(node, options);
            node.wordEnd = true;
            node.value = str;
            ++self.length;
            if (typeof callback === 'function') callback.call(self, null, node);
            return node;
          } else {          
            ++pos;
            node.center = insertChar(node.center,str,pos);
          }
        }
        return node;
      };
      self.rootNode = insertChar(self.rootNode,str,0);
  };

  /**
   * searches the tree for nodes starting with the provided string
   */

  TernaryTree.prototype.contains = function (str, callback) {
    var self = this;
    
    if (typeof callback !== 'function') callback = null;
    if (self.rootNode === null) {
      if (callback)  callback.call(self, new Error(ERR_EMPTY_TREE));
      return;
    }
    if (typeof str !== 'string') {
      if (callback) callback.call(self,new Error(ERR_INVALID_STRING));
      return;
    }
    if (str.length === 0) {
      if (callback) callback.call(self,new Error(ERR_EMPTY_STRING));
      return;
    }

    var self = this
      , pos = 0
      , l = str.length
      , matchingNodes = [];

    var searchContainingNodes = function (node, str, pos) {
      if (node === null || str === null ) {
        return null;
      }
      var cmp = str.charCodeAt(pos);
      var nodeCmp = node.chr.charCodeAt(0);

      if (cmp < nodeCmp) {
        searchContainingNodes(node.lft, str, pos);
      }
      else if (cmp > nodeCmp) {
        searchContainingNodes(node.rgt, str, pos);
      }
      else {
        ++pos;
        matchingNodes.push(node);
        searchContainingNodes(node.center, str, pos);
      }

    };
    searchContainingNodes(self.rootNode, str, pos);

    if (matchingNodes.length === 0) {
      if (callback) callback.call(self,null,[]);
      return;
    }

    var results = [];
    for (var i=0;i<matchingNodes.length;++i) {
      var nodes = _traverse(matchingNodes[i]);
      for (var j=0;j<nodes.length;++j) {
        var node = nodes[j]
          , nodeIncluded = results.indexOf(node) > -1;
        if (str === node.value.substr(0,l) && !nodeIncluded) results.push(node);
      }
    }

    if (callback) callback.call(self, null, results);
  };

  /**
   * searches the tree for nodes, matching nodes with the exact string
   */

  TernaryTree.prototype.search = function (str, callback) {
    var self = this;

    if (typeof callback !== 'function') callback = null;
    if (self.rootNode === null) {
      if (callback)  callback.call(self, new Error(ERR_EMPTY_TREE));
      return;
    }
    if (typeof str !== 'string') {
      if (callback) callback.call(self,new Error(ERR_INVALID_STRING));
      return;
    }
    if (str.length === 0) {
      if (callback) callback.call(self,new Error(ERR_EMPTY_STRING));
      return;
    }

    var pos = 0
      , l = str.length
      , nodeMatched = false;

    var searchNode = function (node, str, pos) {
      if (node === null || str === null ) {
        return null;
      }
      var rStr = str.substr(pos,str.length)
        , cmp = str.charCodeAt(pos)
        , nodeCmp = node.chr.charCodeAt(0);
      if (cmp < nodeCmp) {
        searchNode(node.lft, str, pos);
      }
      else if (cmp > nodeCmp) {
        searchNode(node.rgt, str, pos);
      }
      else {
        pos++;
        if (pos === l) {
          if (callback) callback.call(self, null, node);
          nodeMatched = true;
          return;
        }
        searchNode(node.center, str, pos);
      }
    };
    searchNode(self.rootNode,str,pos);
    if (nodeMatched === false && callback) callback.call(self, null, null);
  }

  /**
   * searches the tree for nodes, matching nodes with a string similar to the provided string
   */

  TernaryTree.prototype.similarSearch = function  (str,distance, callback) {
    var self = this;
    if (typeof callback !== 'function') callback = null;

    if (self.rootNode === null) {
      if (callback)  callback.call(self, new Error(ERR_EMPTY_TREE));
      return;
    }
    if (typeof str !== 'string') {
      if (callback) callback.call(self,new Error(ERR_INVALID_STRING));
      return;
    }
    if (str.length === 0) {
      if (callback) callback.call(self,new Error(ERR_EMPTY_STRING));
      return;
    }

    var pos = 0
      , l = str.length
      , matchingNodes = [];

    var searchSimilarNode = function (node, str, pos, d) {
      if (node === null || str === null || d < 0) {
        return;
      }

      var rStr = str.substr(pos,str.length)
        , s = str.charCodeAt(pos)
        , cmp = node.chr.charCodeAt(0);

      if (d > 0 || s < cmp) {
        searchSimilarNode(node.lft, str, pos, d);
      }

      if (node.wordEnd === true) {
        if (rStr.length <= d) {
          nodeIncluded = matchingNodes.indexOf(node) > -1;
          if (!nodeIncluded) matchingNodes.push(node);
        } else  {
          searchSimilarNode(node.center, str, s ? pos+1 : pos, s === cmp ? d : d-1);
        }
      } else {
        searchSimilarNode(node.center, str, s ? pos+1 : pos, s === cmp ? d : d-1);  
      }

      if (d > 0 || s > cmp) {
        searchSimilarNode(node.rgt,str,pos,d);      
      }
    };

    searchSimilarNode(self.rootNode, str, pos, distance);

    if (callback) callback.call(self, null, matchingNodes);
  };

  return TernaryTree;
})();

/**
 * +Node.js support
 */

if (typeof module === 'object') {
  module.exports = TernaryTree;
}
