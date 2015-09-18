var fiber = require('fiber')

exports.defineProduct = function () {
  var RandomId = function () {
    return {
      init: function () {
        this.id = 4
      }
    }
  }
  var Rated = function () {
    return {
      init: function () {
        this.rating = undefined
      },
      rate: function (stars) {
        this.rating = stars
      }
    }
  }
  var Base = fiber.extend(function () {
    return {
      init: function () {
        return this
      }
    }
  })
  fiber.mixin(Base, RandomId, Rated)
  var Product = Base.extend(function (base) {
    return {
      init: function (options) {
        this.name = options.name
      },
      rate: function (stars) {
        return base.rate.call(stars)
      }
    }
  })
  return Product
}
