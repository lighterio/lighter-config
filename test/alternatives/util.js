var util = require('util')

exports.defineProduct = function () {
  function RandomId () {
    this.id = 4
  }
  function Rated () {
    RandomId.call(this)
    this.rating = undefined
  }
  util.inherits(Rated, RandomId)
  Rated.prototype.rate = function rate (stars) {
    this.rating = stars
  }
  function Base () {
    Rated.call(this)
  }
  util.inherits(Base, Rated)
  function Product (options) {
    Base.call(this)
    this.name = options.name
  }
  util.inherits(Product, Base)
  Product.prototype.rate = function rate (stars) {
    return Base.prototype.rate.call(this, stars)
  }
  return Product
}
