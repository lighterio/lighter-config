var klass = require('klass')

exports.defineProduct = function () {
  var RandomId = klass(function () {
    this.id = 4
  })
  var Rated = RandomId.extend(function () {
    this.rating = undefined
  }).methods({
    rate: function (stars) {
      this.rating = stars
    }
  })
  var Base = Rated.extend()
  var Product = Base.extend(function (options) {
    this.name = options.name
  }).methods({
    rate: function (stars) {
      return this.supr(stars)
    }
  })
  return Product
}
