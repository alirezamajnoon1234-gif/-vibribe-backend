const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

if (!code.includes('/api/admin/login')) {
  const loginRoute = `
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'vibribe2024') {
    res.json({ success: true, token: 'secret-admin-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});
`;
  // این بار کد رو دقیقا بعد از ساخت اپ اضافه میکنیم
  code = code.replace("const app = express();", "const app = express();\n" + loginRoute);
  fs.writeFileSync('server.js', code);
  console.log('✅ کد لاگین با موفقیت اضافه شد!');
} else {
  console.log('⚠️ کد لاگین از قبل وجود داشت!');
}
