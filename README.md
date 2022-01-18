# nodejs

## express-rate-limit

- express-rate-limit 버전 바뀌면서 middleware에

```js
const limiter = new RateLimit({
  ~~~
})
에서

const limiter = RateLimit({
  ~~~
})으로 바뀜
```

---

## <a href='https://www.npmjs.com/package/cors'>cors</a>

- 웹 브라우저에서 도메인이 서로 다른 서버끼리 요청을 주고 받을 수 있게 하는 보안 정책 (라우터 단위로 걸어주는게 안전!!)

```js
app.use(
  cors({
    origin: "localhost:4000",
    credentials: true,
  })
);
```

공식문서 읽으면서 하는게 제일 좋음

---

## 📓 middleware 확장 패턴

```js
router.use((req, res, next) => {
  if(){
    ~~~
    (req, res, next);
  } else {
    next();
  }
});

```

---

## Test란?

### ⚠️ TDD(엄격) !== Test(그냥 test하는 것) !!!!!!!

- 유닛테스트 -> 떼어낼 수 있는 함수를 test 하는 것 (함수안에 if-else문을 분기점으로 test하고 같은 함수로 그룹화 하는것 추천!)

```js
ex)
describe('isLoggedIn', () => {
  // 공통되는 것들 함수 밖으로 빼고 값이 달라지는 것들은 함수안에 넣는다
  const res = { // 가짜(mocking) res 객체 생성
    status: jest.fn(() => res),
    send: jest.fn(),
  };
  const next = jest.fn(); // next라는 가짜 함수를 만든다.

  test('로그인이 되어 있으면 isLoggedIn이 next를 호출해야 함', () => {
    const req = { // 가짜 req 객체 생성
      isAuthenticated: jest.fn(() => true),
    };
    isLoggedIn(req, res, next); // 가짜로 만든 것들 넣어서 한번 실행
    expect(next).toBeCalledTimes(1);
  });

  test('로그인이 되어 있지않으면 isLoggedIn이 에러를 응답해야 함', () => {
    const req = { // 가짜 req 객체 생성
      isAuthenticated: jest.fn(() => false),
    };
    isLoggedIn(req, res, next);
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledWith('로그인 필요');
  });
});
```

### ⚠️ test할 대상을 정확히 할 것!!!!!

### ⚠️ promise의 resolve, reject는 비동기 작업의 처리 과정에서 성공/실패를 구분하는 방법!!!!
