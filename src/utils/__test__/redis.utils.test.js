const redisUtils = require('../redis.utils.js');
const { client } = require('../redis.client');

describe('Retrieve token function', () => {
  it('should return the userData for valid token', () => {
    jest.spyOn(client, 'getex').mockReturnValue('USER_NAME');
    const userName = redisUtils.retriveToken('abc');
    expect(userName).toBe('USER_NAME');
  });
  it('should throw error for invalid token', () => {
    jest.spyOn(client, 'getex').mockReturnValue(null);
    try { redisUtils.retriveToken('abc'); } catch (e) {
      expect(e.message).toBe('Invalid User');
    }
  });
});
