const SocketIO = require('socket.io');

module.exports = (server, app) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  io.on('connection', (server) => {
    const req = socket.request;
    const { header: { referer } } = req;
    const roomId = referer.split('/')[referer.split('/').length - 1];
    socket,join(roomId);
    socket.on('disconnect', () => {
      socket.leave(roomId);
    });
  });
};