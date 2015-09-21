var augment = require('augment')

exports.defineProduct = function () {
  var RandomId = augment(Object, function () {
    this.id = 4
  })
  var Rated = augment(RandomId, function (uber) {
    this.constructor = function () {
      uber.constructor.call(this)
      this.rating = undefined
    }
    this.rate = function (stars) {
      this.rating = stars
    }
  })
  var Base = augment(Rated, function (uber) {
    this.constructor = function () {
      uber.constructor.call(this)
    }
  })
  var Product = augment(Base, function (uber) {
    this.constructor = function (options) {
      uber.constructor.call(this)
      this.name = options.name
    }
    this.rate = function (stars) {
      return uber.rate.call(this, stars)
    }
  })
  return Product
}
