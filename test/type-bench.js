var fs = require('fs')
var fns = {}
var dir = __dirname + '/alternatives'
fs.readdirSync(dir).forEach(function (file) {
  var key = file.replace('.js', '')
  fns[key] = require(dir + '/' + file)
})

return

describe('Benchmarks', function () {

  bench('Definition', function () {
    Object.keys(fns).forEach(function (name) {
      var fn = fns[name]
      it(name, fn)
    })
  })

  bench('Instantiation', function () {
    Object.keys(fns).forEach(function (name) {
      var Product = fns[name]()
      var fn = function () {
        var product = new Product({'name': 'widget'})
        product.rate(12)
      }
      it(name, fn)
    })
  })

})
