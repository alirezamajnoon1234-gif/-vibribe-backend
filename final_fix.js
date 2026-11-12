const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

// 1. اضافه کردن خواننده JSON
if (!code.includes('app.use(express.json())')) {
  code = code.replace('const app = express();', "const app = express();\napp.use(express.json());");
}

// 2. ساختن دوباره متغیر سرور (برای Socket.io)
if (code.includes('server.listen') && !code.includes('const server =')) {
  code = code.replace("server.listen", "const http = require('http');\nconst server = http.createServer(app);\n\nserver.listen");
}

fs.writeFileSync('server.js', code);
console.log('✅ متغیر سرور و JSON با موفقیت تعمیر شدند!');
