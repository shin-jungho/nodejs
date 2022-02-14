const SSE = require('sse');

module.exports = (server) => {
  const sse = new SSE(server);
  sse.on('connection', (client) => { // 서버센트이벤트 연결 => 클라이언트한테 서버 시간 보내주는것
    setInterval(() => { 
      client.send(Date.now().toString()); // sse 문자열만 전송 가능하므로 toString으로 문자열로 바꿔서 전송
    }, 1000);
  });
};