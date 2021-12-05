const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); // 밑에 문장들 html 인거 알려주는 것 
  res.write('<h1>HEllo node</h1>');
  res.write('<p>HEllo node</p>');
  res.end('<p>HEllo zeroCho</p>');
})


// .listen(8080, () => {
//   console.log('8080번 포트에서 서버 대기중입니다.');
// });
// 밑에 에러처리 

    .listen(8080);
  server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중 입니다.');
  });
  server.on('error', (error) => {
    console.error(err);
  })