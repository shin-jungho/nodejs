const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 3000); //서버에다가 속성을 심는다는 느낌 (전역변수 느낌)

app.use((req, res, next) => {
  console.log('모든 요청에 실행하고 싶어요')
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/category/:name', (req, res) => { // : => 와일드 카드 
  res.send(`hello ${req.params.name}`);
});

app.post('/', (req, res) => {
  res.send('hello express');
});

app.get('/about', (req, res) => {
  res.send('hello express');
});

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});

// 범위가 넓은 라우터들은 밑에 넣는다.