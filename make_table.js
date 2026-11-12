const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function createTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pack_items (
        id SERIAL PRIMARY KEY,
        pack_id INTEGER REFERENCES packs(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(50) NOT NULL,
        rarity VARCHAR(50) NOT NULL,
        weight NUMERIC NOT NULL,
        image_url TEXT
      );
    `);
    console.log("✅ Table 'pack_items' created successfully!");
  } catch (err) {
    console.error("❌ Error creating table:", err.message);
  } finally {
    pool.end();
  }
}
createTable();
