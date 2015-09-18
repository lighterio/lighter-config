var Type = require('../../lighter-type')

exports.defineProduct = function () {
  var RandomId = Type.extend({
    init: function () {
      this.id = 4
    }
  })
  var Rated = Type.extend({
    init: function () {
      this.rating = undefined
    },
    rate: function (stars) {
      this.rating = stars
    }
  })
  var Base = Rated.extend({
    init: function () {
      RandomId.call(this)
      Rated.call(this)
    }
  })
  var Product = Base.extend({
    init: function (options) {
      Base.call(this)
      this.name = options.name
    }
  })
  return Product
}
