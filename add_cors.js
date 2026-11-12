const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

if (!code.includes('app.use(cors())')) {
  code = code.replace('app.use(express.json());', 'app.use(cors());\napp.use(express.json());');
  fs.writeFileSync('server.js', code);
  console.log('✅ CORS Added successfully!');
} else {
  console.log('✅ CORS already exists!');
}
