const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

if (!code.includes('/api/admin/stats')) {
  const newRoute = `
app.get('/api/admin/stats', async (req, res) => {
  try {
    const usersCount = await pool.query('SELECT COUNT(*) FROM users');
    const packsCount = await pool.query('SELECT COUNT(*) FROM packs');
    const totalAct = await pool.query('SELECT SUM(act_balance) FROM users');
    
    res.json({ 
      success: true, 
      totalUsers: parseInt(usersCount.rows[0].count), 
      totalPacks: parseInt(packsCount.rows[0].count),
      totalAct: parseFloat(totalAct.rows[0].sum || 0)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
`;
  code = code.replace('app.listen', newRoute + '\napp.listen');
  fs.writeFileSync('server.js', code);
  console.log('✅ Stats route added successfully!');
} else {
  console.log('✅ Stats route already exists!');
}
