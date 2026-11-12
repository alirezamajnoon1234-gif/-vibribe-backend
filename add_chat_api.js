const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

if (!code.includes('/api/admin/all-messages')) {
  const newRoute = `
app.get('/api/admin/all-messages', async (req, res) => {
  try {
    const messages = await pool.query(\`
      SELECT m.*, 
             s.username as sender_username, 
             r.username as receiver_username 
      FROM messages m 
      JOIN users s ON m.sender_id = s.id 
      JOIN users r ON m.receiver_id = r.id 
      ORDER BY m.created_at DESC LIMIT 100
    \`);
    res.json({ success: true, messages: messages.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
`;
  code = code.replace('app.listen', newRoute + '\napp.listen');
  fs.writeFileSync('server.js', code);
  console.log('✅ Chat route added successfully!');
} else {
  console.log('✅ Chat route already exists!');
}
