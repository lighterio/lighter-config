# lighter-type
[![Chat](https://badges.gitter.im/chat.svg)](//gitter.im/lighterio/public)
[![Version](https://img.shields.io/npm/v/lighter-type.svg)](//www.npmjs.com/package/lighter-type)
[![Downloads](https://img.shields.io/npm/dm/lighter-type.svg)](//www.npmjs.com/package/lighter-type)
[![Build](https://img.shields.io/travis/lighterio/lighter-type.svg)](//travis-ci.org/lighterio/lighter-type)
[![Coverage](https://img.shields.io/coveralls/lighterio/lighter-type/master.svg)](//coveralls.io/r/lighterio/lighter-type)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](//github.com/feross/standard)

The `lighter-type` module is a lightweight inheritance utility.

It supports:
* Constructors
* Prototypal inheritance
* Multiple inheritance
* Non-enumerable property definitions


## Installation

From your project directory, install and save as a dependency:
```bash
npm install --save lighter-type
```


## Extreme Performance

All inheritance libraries have a cost, and the cost of `lighter-type`
has been kept to a minimum. Since applications are likely to create
many instances of an object, performance optimizations have been focused
more on object instantiation than prototype definition. As a result,
we have achieved more operations per second than other modules in our
object instantiation benchmark:

<img src="https://raw.githubusercontent.com/lighterio/lighter-type/master/test/bench/run.png" width="600" height="340">


## API

The `lighter-type` module outputs a constructor with several methods.

### Type.extend(map)

Define and return a sub type of the `Type` object, with a prototype decorated
with a `map` of additional properties. Additionally, the sub type itself gets
the same properties as its super type (such as the `extend` method).

When the `map` includes a property called `init`, it is used as the constructor
for the sub type rather than being added as a prototype property.

```javascript
var Type = require('lighter-type')

// Make a Person type.
var Person = Type.extend({

  // Construct a new person with a name.
  init: function (name) {
    this.name = name
  },

  // Give each person a default salutation of "Hello".
  salutation: 'Hello',

  // Greet a person with their defined salutation.
  greet: function () {
    console.log(this.salutation + ', ' + this.name + '!')
  }

})

// Make a Friend sub type by extending the Person type.
var Friend = Person.extend({

  // Be a bit more informal with friends.
  salutation: 'Hi'

})

// Instantiate Bob, and greet him.
var bob = new Person('Bob')
bob.greet()
//> "Hello, Bob!"

// Instantiate Joe, and greet him.
var joe = new Friend('Joe')
joe.greet()
//> "Hi, Joe!"
```

Each type's prototype has `_super` property which references its parent
prototype, and each type has a `_super` property which references its
parent type.

```javascript
var Type = require('lighter-type')

var Robot = Type.extend({
  bend: function (object) {
    object.isBent = true
  }
})

var Bender = Robot.extend({
  bend: function (object) {
    this._super.bend(object)
    console.log('Bite my shiny metal ass.')
  }
})

var beam = {}
var bender = new Bender()
bender.bend(beam)
//> Bite my shiny metal ass.

console.log(beam.isBent)
//> true
```

### Type.init(object[, overwrite][, args])

Decorate an object with the prototype of a `Type`, and call its constructor
on the object with an `args` array, unless `args` is `false`, in which case
the constructor will be skipped.

```javascript
// The `lighter-emitter` module extends `lighter-type`.
var Emitter = require('lighter-emitter')

// Make the `console` object into an emitter.
Emitter.init(console)

console.on('hi', function (name) {
  console.log('Hi, ' + name + '!')
})

console.emit('hi', 'Sam')
//> Hi, Sam!
```

### Type.decorate(object[, map][, overwrite])

Decorate an `object` with a `map` of additional properties (or overriding
properties if `overwrite` is truthy). If the map is not specified, the `Type`
prototype will decorate the `object` prototype instead.

```javascript
var Type = require('lighter-type')

// Add a few methods to the Array object's prototype.
Type.decorate(Array.prototype, {
  first: function () {
    return this[0]
  },
  last: function () {
    return this[this.length - 1]
  },
  sum: function () {
    var s = 0
    for (var i = 0, l = this.length; i < l; i++) {
      s += this[i]
    }
    return s
  }
})

// Create a plain old array of numbers.
var a = [1, 2, 3]

console.log(a.first())
//> 1

console.log(a.last())
//> 3

console.log(a.sum())
//> 6
```

The `decorate` method can be used for multiple inheritance purposes, by
using multiple Type prototypes to decorate another object prototype.

```javascript
var Type = require('lighter-type')

// A vehicle might work on land or water.
var Vehicle = Type.extend({

  // Return isLandVehicle as a boolean.
  worksOnLand: function () {
    return !!this.isLandVehicle
  },

  // Return isWaterVehicle as a boolean.
  worksOnWater: function () {
    return !!this.isWaterVehicle
  }

})

// A car is a land vehicle.
var Car = Vehicle.extend({
  isLandVehicle: true
})

// A boat is a water vehicle.
var Boat = Vehicle.extend({
  isWaterVehicle: true
})

// A hovercraft is a vehicle, plain and simple.
var Hovercraft = Vehicle.extend({})

// Make it work like a car or a boat.
Car.decorate(Hovercraft)
Boat.decorate(Hovercraft)

// Create a new Hovercraft.
var hovercraft = new Hovercraft()

console.log(hovercraft.worksOnLand())
//> true

console.log(hovercraft.worksOnWater())
//> true
```

### Type.hide(object, key, value)

Create a property of `object` named `key` with value `value`, and "hide" it by
making it non-enumerable.

```javascript
var Type = require('lighter-type')

// Create an object with a visible (i.e. enumerable) method.
var object = {
  visible: function () {
    console.log('I am visible.')
  }
}

// Add a non-enumerable property called "hidden".
Type.hide(object, 'hidden', function () {
  console.log('I am hidden.')
})

// Verify that the "hidden" method exists.
object.hidden()
//> "I exist."

// Verify that only the "visible" method is enumerable.
for (var key in object) {
  console.log(key)
}
//> "visible"
```

## Acknowledgements

We would like to thank all of the amazing people who use, support,
promote, enhance, document, patch, and submit comments & issues -
`lighter-type` couldn't exist without you.

Additionally, huge thanks go to [eBay](http://www.ebay.com) for employing
and supporting [`lighter-type`](http://lighter.io/lighter-type) project
maintainers, and for being an epically awesome place to work (and play).
