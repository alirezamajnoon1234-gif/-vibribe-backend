const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

if (!code.includes('/api/admin/packs/:id/edit')) {
  const newRoutes = `
app.put('/api/admin/packs/:id/edit', async (req, res) => {
  try {
    const { name, price, size } = req.body;
    await pool.query('UPDATE packs SET name = $1, price = $2, size = $3 WHERE id = $4', [name, price, size, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.put('/api/admin/packs/items/:itemId/edit', async (req, res) => {
  try {
    const { name, type, rarity, weight } = req.body;
    await pool.query('UPDATE pack_items SET name = $1, type = $2, rarity = $3, weight = $4 WHERE id = $5', [name, type, rarity, weight, req.params.itemId]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
`;
  code = code.replace('app.listen', newRoutes + '\napp.listen');
  fs.writeFileSync('server.js', code);
  console.log('✅ Edit routes added successfully!');
} else {
  console.log('✅ Edit routes already exist!');
}
