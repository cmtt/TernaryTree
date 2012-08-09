TernaryTree
==========

This is an implementation of a binary search tree in JavaScript for storing and searching large amounts of strings. They keep the strings in a sorted order and can be searched recursively.

In addition, strings with a pre-defined Hamming distance can be queried. As the performance is way inferior to iterating over an array with regular expressions, it might be useful for spell checking or auto completion though.

Ternary Trees were firstly described by Jon Bentley and Bob Sedgewick in 1997.

## Usage

### insert (str, callback, options)

This function inserts a new string into the tree. Optionally, you can provide an options object in order to retrieve it when performing a search.

### contains (str, callback)

With this function, you can search the tree for all strings beginning with the provided one.

### search (str, callback)

The tree is being searched for the exact string with this function. 

### similarSearch (str, distance, callback)

This function searches similar strings within the Hamming distance provided.

### nodes and callbacks

You can access the string (and the options you stored alongside) by reading the value attribute of the nodes provided by the callack functions. 

## Tests

Tests are included in the tests directory, but this module needs more testing.

## Changes

tbi

## Todo

* improve tests
* Levensthein distance
* partial match search

Further reading
---------------

* Dr. Dobb's: [Ternary Search Trees](http://www.drdobbs.com/database/ternary-search-trees/184410528), Jon Bentley and Bob Sedgewick
* [J. Bentley, B. Sedgewick: Fast Algorithms for Sorting and Searching Strings](http://www.cs.princeton.edu/~rs/strings/paper.pdf) (PDF)
* Wikipedia : [Ternary Search Trees](https://en.wikipedia.org/wiki/Ternary_search_tree)

License
-------

MIT License.