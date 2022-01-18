const request = require('supertest');
const { sequelize } = require('../models');
const app = require('../app');

beforeAll(async() => {
  await sequelize.sync();
})

describe('POST /join', () => {
  test('로그인 안 했으면 가입', (done) => { // 비동기일때 async await이 아니면 비동기 promise, callback 같은경우는 done을 써야 멈춘다.
    request(app)
      .post('/auth/join')
      .send({
        email: 'wjdghtls11@gmail.com',
        nick: 'junghoshin',
        password: 'jungho!995'
      })
      .expect('Location', '/') // 응답 (redirect는 302 location / 이다)
      .expect(302, done);
  });
});

// describe('POST /login', () => {
//   test('로그인 수행', (done) => {
//     request(app)
//       .post('/auth/login')
//       .send({
//         email: 'zerohch0@gmail.com',
//         password: 'nodejsbook',
//       })
//       .expect('Location', '/')
//       .expect(302, done);
//   });
// });

afterAll(async() => {
  await sequelize.sync({force: true});
})