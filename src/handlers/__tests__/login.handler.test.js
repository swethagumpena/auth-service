const { loginHandler } = require('../login.handler');
const service = require('../../services/login.service');

describe('Health Handler', () => {
  let mockJson;
  let mockResponse;
  beforeEach(() => {
    mockJson = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send: mockJson })),
    };
  });

  it('should set response status code to 200', async () => {
    const jwtToken = 'dnkjnvdjksnksd';
    const mockRequest = {
      body: {
        username: 'hi',
        password: 'hi',
        user_details: { hi: 'hi' },
      },
    };
    jest.spyOn(service, 'createUser').mockResolvedValue(jwtToken);
    await loginHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith(jwtToken);
  });
  it('should go to catch block when service throws error ', async () => {
    const mockRequest = {
      body: {
        username: 'hi',
        password: 'hi',
        user_details: { hi: 'hi' },
      },
    };
    jest.spyOn(service, 'createUser').mockImplementation(() => { throw new Error('error'); });
    await loginHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith();
  });
});
