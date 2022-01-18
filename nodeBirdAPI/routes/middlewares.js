const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

exports.isLoggedIn = (req, res, next) => { // 로그인 되있는지 파악하는 함수
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => { // 로그인 안되어있는지 파악하는 함수
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') { // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};

exports.apiLimiter = RateLimit({ 
  window: 60 * 1000,
  max: 10, 
  delayMs: 1000,
  handler(req, res) {
    res.status(this.statusCode).json({ //429
      code: this.statusCode,
      message: '1분에 한 번만 요청할 수 있습니다.',
    })
  }
});

exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: '새로운 버전이 나왔습니다.'
  })
}