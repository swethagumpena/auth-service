const registerHandler = require('../register.handler');
const registerService = require('../../services/register.service');

describe('register handler', () => {
  const mockSend = jest.fn();
  const mockRequest = { body: { username: 'abc', password: 'def', user_details: '123' } };
  const mockResponse = {
    status: jest.fn(() => ({ send: mockSend })),
  };
  const mockValue = {
    id: 3,
    username: 'anukriti',
    password: '123',
    user_details: {
      hello: 'hi',
    },
    updatedAt: '2021-03-23T06:54:36.438Z',
    createdAt: '2021-03-23T06:54:36.438Z',
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should set response status code to 201 and return registered user', async () => {
    const spyOnRegisterService = jest.spyOn(registerService, 'createUser');
    spyOnRegisterService.mockResolvedValue(mockValue);
    await registerHandler.registerHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.status().send).toHaveBeenCalledWith(mockValue);
  });
  it('should set response status code to 500', async () => {
    const spyOnRegisterService = jest.spyOn(registerService, 'createUser');
    spyOnRegisterService.mockImplementation(() => {
      throw new Error();
    });
    // spyOnRegisterService.mockResolvedValue(mockFailedValue);
    await registerHandler.registerHandler(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });
});
