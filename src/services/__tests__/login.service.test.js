/* eslint-disable no-unused-vars */
const jwt = require('jsonwebtoken');

jest.mock('redis', () => jest.requireActual('redis-mock'));
const { createUser } = require('../login.service');
const { User } = require('../../models');

describe('createUser', () => {
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

    jest.spyOn(User, 'findOrCreate').mockResolvedValue(mockUser);

    const jwtSignSpy = jest.spyOn(jwt, 'sign');
    jwtSignSpy.mockResolvedValue(mockJWTToken);

    const response = await createUser(mockUsername, mockPassword, mockUserDetails);
    expect(response).toBe(mockJWTToken);
    expect(jwtSignSpy).toHaveBeenCalledWith({
      username: mockUsername,
    },
    process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY_TIME });
  });

  it('should throw error with invalid api call', async () => {
    const mockUsername = 'abc';
    const mockPassword = 'jdnkjdnvkjs';
    const mockJWTToken = '348yr834yt834yt83utirir';
    const mockUserDetails = {
      abc: 'akdfm',
    };
    const errorMessage = 'Invalid API Call';

    jest.spyOn(User, 'findOrCreate').mockImplementation(() => { throw new Error(errorMessage); });
    try {
      await createUser(mockUsername, mockPassword, mockUserDetails);
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
