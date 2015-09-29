var fs = require('fs')
var fns = {}
var dir = __dirname + '/alternatives'
fs.readdirSync(dir).forEach(function (file) {
  var key = file.replace('.js', '')
  try {
    fns[key] = require(dir + '/' + file)
  } catch (ignore) {
  }
})

exports.fns = fns
