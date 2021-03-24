const jwt = require('jsonwebtoken');
const redisUtils = require('../../utils/redis.utils');

jest.mock('redis', () => jest.requireActual('redis-mock'));

const { loginUser } = require('../login.service');
const { User } = require('../../models');

describe('loginUser', () => {
  afterEach(() => jest.clearAllMocks());
  it('should return jwtToken ', async () => {
    const mockUsername = 'abc';
    const mockPassword = 'jdnkjdnvkjs';
    const mockJWTToken = '348yr834yt834yt83utirir';
    const mockUserDetails = {
      abc: 'akdfm',
    };
    const mockUser = [
      {
        dataValues: {
          id: 13,
          userName: mockUsername,
          password: mockPassword,
          updatedAt: '2021-03-12T12:54:20.461Z',
          createdAt: '2021-03-12T12:54:20.461Z',
          user_details: mockUserDetails,
        },
        _previousDataValues: {
          id: 13,
          userName: mockUsername,
          password: mockPassword,
          updatedAt: '2021-03-12T12:54:20.461Z',
          createdAt: '2021-03-12T12:54:20.461Z',
          user_details: mockUserDetails,
        },
        _options: {
          isNewRecord: true,
          _schema: null,
          _schemaDelimiter: '',
          attributes: undefined,
          include: undefined,
          raw: undefined,
          silent: undefined,
        },
        isNewRecord: false,
      },
      false,
    ];
    jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);
    const jwtSignSpy = jest.spyOn(jwt, 'sign');
    jwtSignSpy.mockReturnValue(mockJWTToken);
    const spyOnRedisUtils = jest.spyOn(redisUtils, 'storeToken').mockResolvedValue(mockUsername);
    const response = await loginUser(mockUsername, mockPassword);
    expect(spyOnRedisUtils).toHaveBeenCalledWith(mockJWTToken, mockUsername);
    expect(response).toBe(mockJWTToken);
    expect(jwtSignSpy).toHaveBeenCalled();
  });
  it('should throw error Unauthenticated', async () => {
    const mockUsername = 'abc';
    const mockPassword = 'jdnkjdnvkjs';
    const errorMessage = 'Unauthenticated';
    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    try {
      await loginUser(mockUsername, mockPassword);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
