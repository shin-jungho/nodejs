const { addFollowing } = require('./user');
jest.mock('../models/user') // 무조건 Require보다 무조건 위에 적기
const User = require('../models/user');

describe('addFollowing', () => {
  const req = {
    user : { id: 1},
    params: { id: 2},
  };
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  }
  const next = jest.fn();
  test('사용자를 찾아 팔로잉을 추가하고 success를 응답해야 함', async() => {
    User.findOne.mockReturnValue(Promise.resolve({ 
      id: 1, name: 'shin',
        addFollowing(value){
          return Promise.resolve(true);
        }
      }));
    await addFollowing(req, res, next);
    expect(res.send).toBeCalledWith('success');
  });

  test('사용자를 못 찾으면 res.status(404).send(no user)를 호출', async() => {
    User.findOne.mockReturnValue(Promise.resolve(null));
    await addFollowing(req, res, next);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith('no user')
  });

  test('DB에서 에러 발생하면 next(error)호출', async() => {
    const error = '사용자 못찾음';
    User.findOne.mockReturnValue(Promise.reject(error));
    await addFollowing(req, res, next);
    expect(next).toBeCalledWith(error);
  });
})