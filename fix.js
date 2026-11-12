const fs = require('fs');
let lines = fs.readFileSync('server.js', 'utf8').split('\n');
lines = lines.filter(l => !l.includes("app.use('/uploads'"));
let i = lines.findIndex(l => l.includes('const app = express()'));
if(i !== -1) {
   lines.splice(i + 1, 0, "app.use('/uploads', express.static('uploads'));");
}
fs.writeFileSync('server.js', lines.join('\n'));
console.log("✅ Fixed successfully!");
