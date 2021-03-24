const { logoutHandler } = require('../logout.handler');
const redisUtils = require('../../utils/redis.util');

jest.mock('redis', () => jest.requireActual('redis-mock'));

describe('Logout handler', () => {
  let mockJson;
  let mockResponse;
  beforeEach(() => {
    mockJson = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockJson })),
    };
  });
  it('should set response status code to 200 on succesful logout', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer abc',
      },
    };
    const logoutSpy = jest.spyOn(redisUtils, 'deleteToken').mockResolvedValue(true);
    jest.spyOn(redisUtils, 'retrieveToken').mockResolvedValue(true);
    await logoutHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(logoutSpy).toHaveBeenCalledWith('abc');
  });
  it('should go to catch block when service throws error ', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer abc',
      },
    };
    jest.spyOn(redisUtils, 'deleteToken').mockRejectedValue(false);
    await logoutHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalled();
  });
  it('should return 400 if token does not exist', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer abc',
      },
    };
    jest.spyOn(redisUtils, 'retrieveToken').mockResolvedValue(false);
    await logoutHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalled();
  });
});
