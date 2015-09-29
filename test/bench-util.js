var fs = require('fs')
var fns = {}
var dir = __dirname + '/alternatives'
fs.readdirSync(dir).forEach(function (file) {
  var key = file.replace('.js', '')
  fns[key] = require(dir + '/' + file)
})

exports.fns = fns
