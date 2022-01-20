jest.mock('../models/user') // 무조건 Require보다 무조건 위에 적기
const { addFollowing } = require('../controllers/user ');

describe('addFollowing', () => {
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  }
  const next = jest.fn();

  test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async() => {
    const req = {
      user : { id: 1},
      params: { id: 2},
    };
    await addFollowing(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 next(error)호출', async() => {
    const error = '사용자 못찾음';
    User.findOne.mockReturnValue(Promise.reject(error));
    await addFollowing(req, res, next);
    expect(next).toBeCalledWith(error);
  });
})