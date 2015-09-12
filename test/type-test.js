var Type = require('../lighter-type')
var is = global.is || require('exam/lib/is')

describe('Type', function () {

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

    it('hides underscored-prefixed keys', function () {
      var o = {}
      Type.decorate(o, {a: 1, _a: 2})
      is(o.a, 1)
      is(o._a, 2)

      // The "_a" property shouldn't be enumerable.
      for (var p in o) {
        is(p, 'a')
      }
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
      fido.barkback(function (error, message) {
        is(message, 'Fido says "woof!"')
      })
    })

  })

  describe('.prototype.init', function () {

    it('is the same as Type', function () {
      is(Type.prototype.init, Type)
    })

    it('instantiates an object', function () {
      var type = new Type()
      is(type.__proto__, Type.prototype)
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

})
