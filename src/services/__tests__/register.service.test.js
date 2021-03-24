const { createUser } = require('../register.service');
const { User } = require('../../models');

describe('createUser', () => {
  const mockUsername = 'abc';
  const mockPassword = 'jdnkjdnvkjs';
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
  it('Should add the data to database and return userDetails', async () => {
    const spyOnCreate = jest.spyOn(User, 'create').mockResolvedValue(mockUser);
    const response = await createUser(mockUsername, mockPassword, mockUserDetails);
    expect(spyOnCreate).toHaveBeenCalled();
    expect(response).toBe(mockUser);
  });
});
