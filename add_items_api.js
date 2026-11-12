const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

if (!code.includes('/api/admin/packs/:id/items')) {
  const newRoutes = `
app.get('/api/admin/packs/:id/items', async (req, res) => {
  try {
    const items = await pool.query('SELECT * FROM pack_items WHERE pack_id = $1 ORDER BY id DESC', [req.params.id]);
    res.json({ success: true, items: items.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete('/api/admin/packs/items/:itemId', async (req, res) => {
  try {
    await pool.query('DELETE FROM pack_items WHERE id = $1', [req.params.itemId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

`;
  code = code.replace('app.listen', newRoutes + '\napp.listen');
  fs.writeFileSync('server.js', code);
  console.log('✅ Item routes added successfully!');
} else {
  console.log('✅ Item routes already exist!');
}
