var modelo = require('modelo')

exports.defineProduct = function () {
  function RandomId () {
    this.id = 4
  }
  function Rated () {
    this.rating = undefined
  }
  Rated.prototype.rate = function rate (stars) {
    this.rating = stars
  }
  function Base () {
    RandomId.call(this)
    Rated.call(this)
  }
  modelo.inherits(Base, RandomId, Rated)
  function Product (options) {
    Base.call(this)
    this.name = options.name
  }
  modelo.inherits(Product, Base)
  Product.prototype.rate = function rate (stars) {
    return Base.prototype.rate.call(this, stars)
  }
  return Product
}
