'use strict'
/* global describe it */
var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type', function () {
  describe('constructor', function () {
    it('instantiates an object', function () {
      var type = new Type()
      is.instanceOf(type, Type)
    })

    it('comes from super if omitted', function () {
      var Super = Type.extend({
        init: function (name) {
          this.name = name
        }
      })
      var Sub = Super.extend({
        isSub: function () {
          return true
        }
      })
      var sub = new Sub('sub')
      is(sub.name, 'sub')
      is(sub.isSub(), true)
    })
  })

  describe('.hide', function () {
    it('creates hidden properties', function () {
      var o = {a: 1}
      Type.hide(o, 'b', 2)
      is(o.a, 1)
      is(o.b, 2)

      // The "a" property shouldn't be enumerable.
      for (var p in o) {
        is(p, 'a')
      }
    })
  })

  describe('.decorate', function () {
    it('decorates with additions', function () {
      var o = {}
      Type.decorate(o, {a: 1})
      is(o.a, 1)
    })

    it('uses a prototype if no decorations are provided', function () {
      var Boxer = Type.extend({
        punch: function () {
          return 'right jab'
        }
      })
      var Kangaroo = Type.extend({
        getCountry: function () {
          return 'AU'
        }
      })
      Boxer.decorate(Kangaroo)
      var joey = new Kangaroo()
      var punch = joey.punch()
      is(punch, 'right jab')
    })

    it('doesn\'t overwrite properties unless told', function () {
      var o = {a: 1, b: 0}
      var p = {b: 2, c: 3}

      // First, decorate without overwriting.
      Type.decorate(o, p)
      is.same(o, {a: 1, b: 0, c: 3})

      // Then decorate with overwriting.
      Type.decorate(o, p, true)
      is.same(o, {a: 1, b: 2, c: 3})
    })
  })

  describe('.extend', function () {
    it('extends a type', function () {
      var Dog = Type.extend({
        init: function (name) {
          this.name = name
        },
        barkback: function (fn) {
          fn(undefined, this.name + ' says "woof!"')
        }
      })
      var fido = new Dog('Fido')
      is.instanceOf(fido, Dog)
      fido.barkback(function (error, message) {
        is.falsy(error)
        is(message, 'Fido says "woof!"')
      })
      is(Object.getPrototypeOf(fido).constructor, Dog)
    })

    it('doesn\'t let sub types modify super types', function () {
      var Super = Type.extend({
        init: function () {
          // This method and Super itself are one and the same.
        }
      })
      Super.extend({
        add: function () {
          // This should be a Sub method, not a Super method.
        }
      })
      is.undefined(Super.prototype.add)
    })
  })

  describe('.init', function () {
    var Adder = Type.extend({
      init: function (name) {
        this.name = name
      },
      add: function (a, b) {
        return a + b
      }
    })

    var AsyncAdder = Type.extend({
      init: function (name) {
        this.name = name
        this.isAsync = true
      },
      add: function (a, b, fn) {
        fn(undefined, a + b)
      }
    })

    it('gives prototype methods to a plain object', function () {
      var calculator = {}
      Adder.init(calculator)
      var three = calculator.add(1, 2)
      is(three, 3)
    })

    it('leaves existing methods alone if not told to overwrite', function () {
      var asyncAdder = new AsyncAdder()
      Adder.init(asyncAdder)
      var noReturnValue = asyncAdder.add(1, 2, function () {})
      is.undefined(noReturnValue)
    })

    it('overwrites existing methods if told to', function () {
      var adder = new AsyncAdder()
      Adder.init(adder, true)
      var three = adder.add(1, 2)
      is(three, 3)
    })

    it('accepts arguments', function () {
      var adder = new AsyncAdder()
      Adder.init(adder, ['me'])
      is(adder.name, 'me')
    })

    it('skips the constructor if arguments is false', function () {
      var calculator = {}
      Adder.init(calculator, false, false)
      is.function(calculator.add)
      is.undefined(calculator.name)
    })
  })
})
