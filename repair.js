const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// پیدا کردن شروع کد خراب
const start = code.indexOf("app.post('/api/admin/login'");
if (start !== -1) {
    // پیدا کردن شروع کد بعدی (تا کد خراب رو فقط تا اینجا پاک کنیم)
    let end = code.indexOf("app.get", start);
    if (end === -1) end = code.indexOf("app.post", start);
    if (end === -1) end = code.indexOf("app.put", start);
    if (end === -1) end = code.indexOf("app.delete", start);
    if (end === -1) end = code.indexOf("app.listen", start);

    if (end !== -1) {
        const correctRoute = `app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'vibribe2024') {
    res.json({ success: true, token: 'secret-admin-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

`;
        // جایگزینی کد خراب با کد سالم
        code = code.slice(0, start) + correctRoute + code.slice(end);
    }
}

// اطمینان از اینکه خواننده JSON فعال است
if (!code.includes('app.use(express.json())')) {
    code = code.replace("const app = express();", "const app = express();\napp.use(express.json());");
}

fs.writeFileSync('server.js', code);
console.log('✅ تعمیر با موفقیت انجام شد!');
