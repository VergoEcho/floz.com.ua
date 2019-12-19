const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = require('./app')

const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  const nuxt = new Nuxt(config)

  const { port } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(nuxt.render)

  app.listen(port)
  consola.ready({
    message: `Server listening on http://77.123.130.156:${port}`,
    badge: true
  })
}
start()


