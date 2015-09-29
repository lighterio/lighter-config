var fns = require('./bench-util').fns
var bench = global.bench || function () {}

bench('Instantiation', function () {
  Object.keys(fns).forEach(function (name) {
    var Product = fns[name].defineProduct()
    var fn = function () {
      var product = new Product({'name': 'widget'})
      product.rate(12)
    }
    it(name, fn)
  })
})
