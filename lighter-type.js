'use strict'
/**
 * A Type can be instantiated and extended to yield sub-types. whose instances can be constructed
 * with an `init` method.
 */

// The base constructor does nothing.
var Type = module.exports = function () {}

/**
 * Extend a Type, yielding a new Type with additional properties from a map.
 *
 * @param  {Object} map  A map of additional properties.
 * @return {Object}      The new Type.
 */
Type.extend = function (map) {

  // Create the constructor, using a new or inherited `init` method.
  var type = map.init || function () {
    type._super.apply(this, arguments)
  }
  delete map.init

  // Copy the super type and its prototype.
  this.decorate(type, this, true)
  this.decorate(type.prototype, this.prototype, true)

  // Copy the properties that extend the super.
  this.decorate(type.prototype, map, true)

  // Make a reference to the super and the super prototype.
  type.prototype._super = this.prototype
  type._super = this

  return type
}

/**
 * Decorate an object with a map of properties.
 *
 * @param  {Object}  object     An object to decorate.
 * @param  {Object}  map        An optional map to decorate the object with.
 * @param  {Boolean} overwrite  Whether to overwrite existing properties.
 */
Type.decorate = function (object, map, overwrite) {
  // If a map isn't provided, use prototypes.
  if (!map) {
    object = object.prototype
    map = this.prototype
  }
  for (var key in map) {
    if (overwrite || (object[key] === undefined)) {
      object[key] = map[key]
    }
  }
}

/**
 * Decorate an object with prototype properties, and run a constructor on it.
 *
 * @param  {Object}         object     An object to decorate.
 * @param  {Boolean}        overwrite  Whether to overwrite existing properties.
 * @param  {Array|Boolean}  args       Optional arguments for the constructor, or false to skip the constructor.
 */
Type.init = function (object, overwrite, args) {
  // Allow calling with (object, args).
  if (overwrite && overwrite.length) {
    args = overwrite
    overwrite = false
  }
  this.decorate(object, this.prototype, overwrite)
  if (args !== false) {
    this.apply(object, args)
  }
}

/**
 * Define a non-enumerable property on an object.
 *
 * @param  {Object} object  An object to define a property on.
 * @param  {String} key     The name of the property to define.
 * @param  {Any}    value   The value of the property to define.
 */
Type.hide = function (object, key, value) {
  Object.defineProperty(object, key, {
    enumerable: false,
    writable: true,
    value: value
  })
}
