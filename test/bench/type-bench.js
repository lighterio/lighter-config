var fs = require('fs')
var fns = {}
var dir = __dirname + '/alternatives'
fs.readdirSync(dir).forEach(function (file) {
  var key = file.replace('.js', '')
  fns[key] = require(dir + '/' + file)
})

describe('Benchmarks', function () {

  bench('Definition', function () {
    this.timeout(6e4)
    Object.keys(fns).forEach(function (name) {
      var fn = fns[name].defineProduct
      it(name, fn)
    })
  })

  bench('Instantiation', function () {
    this.timeout(6e4)
    Object.keys(fns).forEach(function (name) {
      var Product = fns[name].defineProduct()
      var fn = function () {
        var product = new Product({'name': 'widget'})
        product.rate(12)
      }
      it(name, fn)
    })
  })

})
