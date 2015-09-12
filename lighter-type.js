/**
 * A Type can be instantiated and extended to yield sub-types. whose instances can be constructed
 * with an `init` method.
 */

// The base constructor does nothing.
var Type = function () {}

// The constructor function is also stored as "init", for extension purposes.
module.exports = Type.prototype.init = Type

/**
 * Extend a Type, yielding a new Type with additional properties from a map.
 *
 * @param  {Object} map  A map of additional properties.
 * @return {Object}      The new Type.
 */
Type.extend = function (map) {
  // Reference the super prototype which is being extended from.
  var sup = this.prototype

  // Create the constructor, using a new or inherited `init` method.
  var type = map.init || sup.init

  // Reference the sub prototype which is being extended.
  var sub = type.prototype

  // Copy the super type and its prototype.
  Type.decorate(type, this, true)
  Type.decorate(sub, sup, true)

  // Copy the properties that extend the super.
  Type.decorate(sub, map, true)

  // Add the super prototype as a hidden property of the sub prototype.
  Type.hide(sub, '_super', sup)

  return type
}

/**
 * Decorate an object with a map of properties, or a prototype.
 *
 * @param  {Object}  object     An object to decorate.
 * @param  {Object}  map        An optional map to decorate the object with.
 * @param  {Boolean} overwrite  Whether to overwrite values that are already defined.
 */
Type.decorate = function (object, map, overwrite) {
  // If a map isn't provided, use the Type's prototype.
  map = map || this.prototype
  for (var key in map) {
    if (overwrite || (object[key] === undefined)) {
      var value = map[key]
      // Give some privacy to methods starting with "_".
      if (key[0] === '_' || (typeof value === 'function' && value.name[0] === '_')) {
        Type.hide(object, key, value)
      } else {
        object[key] = value
      }
    }
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
