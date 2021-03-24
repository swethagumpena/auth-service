const { loginHandler } = require('../login.handler');
const loginService = require('../../services/login.service');

describe('Login Handler', () => {
  let mockJson;
  let mockResponseJson;
  let mockResponseSend;
  beforeEach(() => {
    mockJson = jest.fn();
    mockResponseJson = {
      status: jest.fn(() => ({ json: mockJson })),
    };
    mockResponseSend = {
      status: jest.fn(() => ({ send: mockJson })),
    };
  });

  it('should set response status code to 200', async () => {
    const jwtToken = 'dnkjnvdjksnksd';
    const mockRequest = {
      body: {
        username: 'hi',
        password: 'hi',
      },
    };
    jest.spyOn(loginService, 'loginUser').mockResolvedValue(jwtToken);
    await loginHandler(mockRequest, mockResponseJson);
    expect(mockResponseJson.status).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({ token: 'dnkjnvdjksnksd' });
  });
  it('should go to catch block when service throws error ', async () => {
    const mockRequest = {
      body: {
        username: 'hi',
        password: 'hi',
      },
    };
    jest.spyOn(loginService, 'loginUser').mockRejectedValue(Error('Unauthenticated'));
    await loginHandler(mockRequest, mockResponseSend);
    expect(mockResponseSend.status).toHaveBeenCalledWith(401);
    expect(mockJson).toHaveBeenCalledWith('Unauthenticated');
  });
  it('should go to catch block when service throws error ', async () => {
    const mockRequest = {
      body: {
        username: 'hi',
        password: 'hi',
      },
    };
    jest.spyOn(loginService, 'loginUser').mockRejectedValue(Error('error'));
    await loginHandler(mockRequest, mockResponseSend);
    expect(mockResponseSend.status).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith('error');
  });
});
