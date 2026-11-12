const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

if (!code.includes('/api/admin/stories/:id')) {
  const newRoute = `
app.delete('/api/admin/stories/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM stories WHERE id = $1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
`;
  code = code.replace('app.listen', newRoute + '\napp.listen');
  fs.writeFileSync('server.js', code);
  console.log('✅ Stories delete route added successfully!');
} else {
  console.log('✅ Stories delete route already exists!');
}
