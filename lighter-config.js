'use strict'
var fs = require('fs')
var pe = process.env
var map = {d: 'development', s: 'staging', p: 'production'}

// Read from an environment variable.
var env = pe.NODE_ENV || pe.LIGHTER_ENV || pe.DEPLOY_ENV || pe.ENV || ''

// Allow many "env" values.
var key = env.toLowerCase()
  .replace(/^([gro]|ca)/, 'p')  // gamma, release, one, canary -> "production".
  .replace(/^(sa|[al])/, 'd')   // sandbox, alpha, local -> "development".
  .replace(/^[qtbcij]/, 's')[0] // qa, test, beta, ci, jenkins -> "staging".

// Resolve to an "environment" value.
var environment = map[key] || map[key = 'd']

var self = module.exports = {
  env: env,
  environment: environment,
  isDebug: /de?bu?g/i.test(env),
  isDevelopment: (key === 'd'),
  isStaging: (key === 's'),
  isProduction: (key === 'p')
}

// Load configuration from files.
load('common')
load(environment)

/**
 * Load a configuration file from the /config directory, and decorate the
 * module exports with its values.
 *
 * @param  {String} name  File name, excluding ".json"
 */
function load (name) {
  var path = 'config/' + name + '.json'
  var json
  var config

  // Read "config/ENV.json".
  try {
    json = '' + fs.readFileSync(path)
  } catch (error) {
    if (self.isDebug) {
      console.error('No configuration found in "' + path + '".', error)
    }
    return
  }

  // Replace tokens like $HOST and ${PORT-8080} with environment variables.
  json = json.replace(/\$(\w+)/g, function (match, key) {
    return pe[key] || ''
  }).replace(/\$\{(\w+)(-[^\}]*)?\}/g, function (match, key, value) {
    return pe[key] || value.substr(1)
  })

  // Parse.
  try {
    config = JSON.parse(json)
  } catch (error) {
    return console.error('Invalid JSON in "' + path + '".', json, error)
  }

  // Set.
  decorate(self, config)
}

/**
 * Decorate one configuration object with values from another.
 *
 * @param  {Object} object  An existing config object.
 * @param  {Object} values  An overriding config object.
 */
function decorate (object, values) {
  for (var key in values) {
    if (typeof object[key] === 'object') {
      decorate(object[key], values[key])
    } else {
      object[key] = values[key]
    }
  }
}
