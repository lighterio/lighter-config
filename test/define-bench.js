'use strict'
/* global it */
var fns = require('./bench-util').fns
var bench = global.bench || function () {}

bench('Definition', function () {
  Object.keys(fns).forEach(function (name) {
    var fn = fns[name].defineProduct
    it(name, fn)
  })
})
