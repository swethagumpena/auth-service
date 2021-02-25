const { handler: healthHandler } = require('../health.handler');

describe('Health Handler', () => {
  const mockJson = jest.fn();
  const mockResponse = {
    status: jest.fn(() => ({ json: mockJson })),
  };
  const mockRequest = null;
  it('should set response status code to 200', () => {
    healthHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
  it('should return string "Server is running!"', () => {
    healthHandler(mockRequest, mockResponse);
    expect(mockResponse.status().json).toHaveBeenCalledWith({ message: 'Server is running' });
  });
});
