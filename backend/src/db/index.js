const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const connectDB = async () => {
  try {
    await pool.connect();
      console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Database connection error', err);
    process.exit(1);
  }
};

const query = async (query, values) => {
  const res = await pool.query(query, values);
  return res.rows;
};

module.exports = {
  connectDB,
  query,
};
