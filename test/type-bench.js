var fns = {
  type: require('./alternatives/type'),
  modelo: require('./alternatives/modelo'),
  util: require('./alternatives/util'),
  klass: require('./alternatives/klass'),
  augment: require('./alternatives/augment'),
  fiber: require('./alternatives/fiber')
}

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
        var p = new Product({'name': 'widget'})
        p.rate(12)
      }
      it(name, fn)
    })
  })
})
