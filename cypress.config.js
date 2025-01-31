const { defineConfig } = require('cypress')
const tasks = require('./cypress/tasks')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    fixturesFolder: false,
    supportFile: false,
    setupNodeEvents(on, config) {
      tasks(on)
      return config
    },
  },
})
