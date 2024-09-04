const reqBody = {
    userIdFromAuth: 'user123',
    addressLine1: '123/2 Patel Sadana',
    addressLine2: 'Giridarshini Layout',
    landmark: 'Near Park',
    city: 'Sample City',
    state: 'Sample State',
    pinCode: '123456',
    country: 'Sample Country',
    isDefault: true,
    addressId: 'address123'
};

const mockAddress = {
    _id: 'address123',
    userId: 'user123',
    addressLine1: '123/2 Patel Sadana',
    addressLine2: 'Giridarshini Layout',
    landmark: 'Near Park',
    city: 'Sample City',
    state: 'Sample State',
    pinCode: '123456',
    country: 'Sample Country',
    isDefault: true,
    save: jest.fn()
};

const mockAddresses = [mockAddress];

module.exports = {
    reqBody,
    mockAddress,
    mockAddresses
};
