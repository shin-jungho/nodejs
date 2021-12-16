const express = require('express');
const path = require('path');
const morgan = require('morgan'); // 요청 응답 기록하는 것 
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const { fstat } = require('fs');
const { connect } = require('http2');

const app = express();

app.set('port', process.env.PORT || 3000); //서버에다가 속성을 심는다는 느낌 (전역변수 느낌)

// 미들웨어 순서 중요

app.use(morgan('dev'));
app.use('/', express.static(__dirname, 'public'));
app.use(cookieParser('zerochopassword'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'zerochopassword',
  cookie: {
    httpOnly: true,
  },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //true 면 qs, false 면 querystring 모듈 쓴다.

app.use('/', (req, res, next) => {
  req.session.data = 'zerocho비번';
}); 

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성 한다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.post('/upload', upload.fields([{name: 'image1', name: 'image2', name: 'image3'}]), (req, res) => { 
  console.log(req.file);
  res.send('ok');
});

app.get('/', (req, res) => {
  // req.session.id = 'hello'; // 요청한 사람만 id hello가 된다.
  req.session.data = 'zerocho비번';
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

app.use((err, req, res, next) => {
  console.error(err);
  res.send('에러지롱~')
})

// const a = (err, req, res, next) => { // const a, const b 다른 함수 console.log 다르게 찍힌다.
//   console.error(err);
// }
// const b = (err, req, res) => {
//   console.error(err);
// }

// console.log(a.length, b.length);

app.listen(app.get('port'), () => {
  console.log('익스프레스 서버 실행');
});

// 1. 범위가 넓은 라우터들은 밑에 넣는다.
// 2. 에러 미들웨어 4개 다쓴다.
// 3. 한 라우터에서 여러번 res.send, res.json 쓰면 cannot set headers after they are sent to the client라는 오류 뜸