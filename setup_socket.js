const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

if (!code.includes('io.on')) {
  const socketLogic = `
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// نگه داشتن لیست کاربران آنلاین
let onlineUsers = {};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // وقتی کاربر وارد سایت میشه، آیدیش رو ثبت میکنیم
  socket.on('user_online', (userId) => {
    onlineUsers[userId] = socket.id;
  });

  // وقتی پیامی فرستاده میشه
  socket.on('send_message', (data) => {
    const receiverSocketId = onlineUsers[data.receiverId];
    if (receiverSocketId) {
      // پیام رو فوری به گوشی/مرورگر گیرنده میفرستیم
      io.to(receiverSocketId).emit('receive_message', data);
    }
  });

  // وقتی کاربر از سایت خارج میشه
  socket.on('disconnect', () => {
    for (const [userId, socketId] of Object.entries(onlineUsers)) {
      if (socketId === socket.id) {
        delete onlineUsers[userId];
        break;
      }
    }
    console.log('User disconnected:', socket.id);
  });
});
`;

  // اضافه کردن این کدها دقیقا قبل از server.listen
  code = code.replace('server.listen(', socketLogic + '\nserver.listen(');
  fs.writeFileSync('server.js', code);
  console.log('✅ Socket.io logic added successfully!');
} else {
  console.log('✅ Socket.io logic already exists!');
}
