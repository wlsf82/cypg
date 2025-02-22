const { defineConfig } = require('cypress')
const tasks = require('./cypress/tasks')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      API_URL: 'http://localhost:3001/api'
    },
    supportFile: false,
    setupNodeEvents(on, config) {
      tasks(on)
      return config
    },
  },
})
