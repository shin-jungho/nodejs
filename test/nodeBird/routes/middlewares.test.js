const { isLoggedIn, isNotLoggedIn } = require('./middlewares')

describe('isLoggedIn', () => {
  // 공통되는것들 함수 밖으로 빼고 값이 달라지는 것들은 함수안에 넣는다
  const res = { // 가짜 res 객체 생성
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

describe('isNotLoggedIn', () => {
  const res = { // 가짜 res 객체 생성
    status: jest.fn(() => res),
    send: jest.fn(),
    redirect: jest.fn(),
  }; 
  const next = jest.fn(); // next라는 가짜 함수를 만든다.
  test('로그인이 되어 있으면 isNotLoggedIn이 next를 호출해야 함', () => {
    const req = { // 가짜 req 객체 생성
      isAuthenticated: jest.fn(() => true),
    };
    const message = encodeURIComponent('로그인한 상태입니다.');
    isNotLoggedIn(req, res, next);
    expect(res.redirect).toBeCalledWith(`/?error=${message}`); 
  });
  
  test('로그인이 되어 있지않으면 isNotLoggedIn이 에러를 응답해야 함', () => {
    const req = { // 가짜 req 객체 생성
      isAuthenticated: jest.fn(() => false),
    };
    isNotLoggedIn(req, res, next);
    expect(next).toBeCalledTimes(1);
  }); 
});

