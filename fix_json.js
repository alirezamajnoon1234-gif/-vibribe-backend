const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// 1. پاک کردن مسیر لاگینِ خراب قبلی
code = code.replace(/app\.post\('\/api\/admin\/login'[\s\S]*?\}\);\n/g, '');

// 2. اضافه کردن خواننده JSON و مسیر لاگین در جای درست
const fixedRoute = `
app.use(express.json());
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'vibribe2024') {
    res.json({ success: true, token: 'secret-admin-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});
`;

if (!code.includes('/api/admin/login')) {
  code = code.replace("const app = express();", "const app = express();\n" + fixedRoute);
  fs.writeFileSync('server.js', code);
  console.log('✅ JSON Parser & Login Route added perfectly!');
} else {
  console.log('⚠️ Route already exists.');
}
