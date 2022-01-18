# nodejs

## express-rate-limit

### 1. express-rate-limit 버전 바뀌면서 middleware에

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

## <a href='https://www.npmjs.com/package/cors'>Cors</a>

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

## middleware 확장 패턴

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
