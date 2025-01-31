const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

module.exports = on => {
  on('task', {
    queryDatabase({ query, values }) {
      return new Promise((resolve, reject) => {
        pool.query(query, values)
          .then(res => resolve(res.rows))
          .catch(err => reject(err))
        })
    }
  })
}
