const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

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

if (!code.includes('/api/admin/login')) {
  code = code.replace('app.listen', loginRoute + '\napp.listen');
  fs.writeFileSync('server.js', code);
  console.log('✅ Login route added successfully!');
} else {
  console.log('✅ Login route already exists!');
}
