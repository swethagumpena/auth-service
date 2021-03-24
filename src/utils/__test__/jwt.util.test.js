const jwt = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');
const { jwtVerify } = require('../jwt.util');

describe('jwtVerify Util', () => {
  it('should throw error when jwtToken is expired', async () => {
    const mockJwtToken = '161t2357647325';
    jest.spyOn(jwt, 'verify').mockImplementation((tooken, secret, callback) => { callback(new TokenExpiredError(), undefined); });
    try {
      await jwtVerify(mockJwtToken);
    } catch (error) {
      expect(error.name).toEqual('TokenExpiredError');
    }
  });

  it('should return userdata', async () => {
    const mockJwtToken = '161t2357647325';
    const mockUserName = 'appy385';
    jest.spyOn(jwt, 'verify').mockImplementation((tooken, secret, callback) => { callback(undefined, { username: mockUserName }); });
    const data = await jwtVerify(mockJwtToken);
    expect(data).toEqual({ username: mockUserName });
  });
});
