const jwt = require('jsonwebtoken');
const { TokenExpiredError } = require('jsonwebtoken');
jest.mock('redis', () => jest.requireActual('redis-mock'));
const { authenticateService } = require('../auth.service');
const redisUtil = require('../../utils/redis.util');
const jwtUtil  = require('../../utils/jwt.util');

describe('authenticateService',  () => {

  it('should throw error when jwtToken is expired', async () => {
    const mockJwtToken = "161t2357647325";
    jest.spyOn(jwt, 'verify').mockImplementation(() => { throw new TokenExpiredError() });
    try{
        await authenticateService(mockJwtToken);
    } catch(error){
        expect(error.name).toEqual('TokenExpiredError');
    }
  });

  it('should return userdata', async () => {
    const mockJwtToken = "161t2357647325";
    const mockUserName = "appy385";
    jest.spyOn(jwtUtil, 'jwtVerify').mockResolvedValue({username: mockUserName });
    const redisUtilSpy = jest.spyOn(redisUtil, 'retrieveToken');
    redisUtilSpy.mockResolvedValue(mockUserName);
    const data = await authenticateService(mockJwtToken);
    expect(redisUtilSpy).toHaveBeenCalledWith(mockJwtToken);
    expect(data).toBe(mockUserName);
   
  });
});
