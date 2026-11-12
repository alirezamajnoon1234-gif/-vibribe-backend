const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// 1. پاک کردن هر تعریف خراب از pool که قبلا مونده
code = code.replace(/const pool = new Pool\([\s\S]*?\);/g, '');
code = code.replace(/const { Pool } = require\('pg'\);/g, '');

// 2. ساخت تعریف درست
const poolSetup = `
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
`;

// 3. گذاشتنش دقیقاً زیر جایی که dotenv لود میشه
if (code.includes("require('dotenv').config();")) {
    code = code.replace("require('dotenv').config();", "require('dotenv').config();\n" + poolSetup);
} else {
    code = poolSetup + code;
}

fs.writeFileSync('server.js', code);
console.log('✅ Database connection (pool) restored successfully!');
