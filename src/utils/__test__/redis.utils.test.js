const redisUtils = require('../redis.utils.js');
const { client } = require('../redis.client');

jest.mock('redis', () => jest.requireActual('redis-mock'));

describe('Retrieve token function', () => {
  it('should return the userData for valid token', async () => {
    jest.spyOn(client, 'get').mockImplementation((token, callback) => callback(undefined, 'USER_NAME'));
    const userName = await redisUtils.retrieveToken('abc');
    expect(userName).toBe('USER_NAME');
  });
  it('should return null if valid token not found', async () => {
    jest.spyOn(client, 'get').mockImplementation((token, callback) => callback(undefined, null));
    const userName = await redisUtils.retrieveToken('abc NOT EXIST');
    expect(userName).toBe(null);
  });
  it('should reject with error if error in reading', async () => {
    jest.spyOn(client, 'get').mockImplementation((token, callback) => callback('Error', undefined));
    try { await redisUtils.retrieveToken('abc'); } catch (e) {
      expect(e.message).toBe('Error');
    }
  });
});
describe('store token function', () => {
  it('should set the token', async () => {
    const spyOnSetex = jest.spyOn(client, 'setex').mockImplementation((token, accessToken, username, func) => 'ok');
    await redisUtils.storeToken('abjhbdcwd', 'abc');
    expect(spyOnSetex).toHaveBeenCalled();
  });
});

describe('delete token function', () => {
  it('should delete the token', async () => {
    const spyOnDel = jest.spyOn(client, 'DEL').mockImplementation((token, func) => 'ok');
    await redisUtils.deleteToken('abc');
    expect(spyOnDel).toHaveBeenCalled();
  });
});
