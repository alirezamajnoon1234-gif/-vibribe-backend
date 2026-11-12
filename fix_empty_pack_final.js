const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const targetStr = "let random = Math.random() * totalWeight;";
const replacementStr = "if (possibleItems.length === 0) { return res.status(400).json({ success: false, message: 'This pack is empty! Please add items to it in the admin panel.' }); }\n    let random = Math.random() * totalWeight;";

if (code.includes(targetStr) && !code.includes("This pack is empty!")) {
    code = code.replace(targetStr, replacementStr);
    fs.writeFileSync('server.js', code);
    console.log('✅ Empty pack bug fixed successfully!');
} else {
    console.log('✅ Already fixed or target string not found. (Check if it is already fixed)');
}
