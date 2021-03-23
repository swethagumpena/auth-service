const { authHandler } = require('../auth.handler');
const service = require('../../services/auth.service');

describe('Auth Handler', () => {
  let mockSend;
  let mockResponse;
  beforeEach(() => {
    mockSend = jest.fn();
    mockResponse = {
      status: jest.fn(() => ({ send:mockSend })),
    };
  });

  it('should set response status code to 200', async () => {
    const mockUserObject = { name:"apoorva" };
    const mockRequest = {
     headers: {authorization: 'Bearer jhgjhdvbcjsdbv'}
    };
    const authenticateServiceSpy = jest.spyOn(service, 'authenticateService');
    authenticateServiceSpy.mockResolvedValue(mockUserObject);
    await authHandler(mockRequest, mockResponse);
    expect(authenticateServiceSpy).toHaveBeenCalledWith(mockRequest.headers.authorization.split(' ')[1])
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockSend).toHaveBeenCalledWith(mockUserObject);
  });
  it('should go to catch block when service throws error ', async () => {
    const mockRequest = {
        headers: {authorization: 'Bearer jhgjhdvbcjsdbv'}
    };
    jest.spyOn(service, 'authenticateService').mockImplementation(() => { throw new Error('error'); });
    await authHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockSend).toHaveBeenCalledWith();
  });
});
