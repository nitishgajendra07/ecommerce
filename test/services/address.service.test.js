const { addAddress, getAddressesOfUser, setDefaultAddress } = require('../../src/services/address.service');
const { Address } = require('../../src/models/address.model');
const { reqBody, mockAddress, mockAddresses } = require('../testData/controllersData/address.controller.testData');

jest.mock('../../src/models/address.model');

describe('Address Service Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addAddress', () => {
        test('should add a new address successfully', async () => {
            Address.create.mockResolvedValue(mockAddress);

            const result = await addAddress(reqBody);

            expect(Address.create).toHaveBeenCalledWith({
                userId: reqBody.userIdFromAuth,
                addressLine1: reqBody.addressLine1,
                addressLine2: reqBody.addressLine2,
                landmark: reqBody.landmark,
                city: reqBody.city,
                state: reqBody.state,
                pinCode: reqBody.pinCode,
                country: reqBody.country,
                isDefault: reqBody.isDefault
            });
            expect(result).toBe(mockAddress);
        });

        test('should throw an error if address creation fails', async () => {
            Address.create.mockRejectedValue(new Error('Error creating address'));

            await expect(addAddress(reqBody)).rejects.toThrow('Error creating address');
        });
    });

    describe('getAddressesOfUser', () => {
        test('should get addresses of a user successfully', async () => {
            Address.find.mockResolvedValue(mockAddresses);

            const result = await getAddressesOfUser(reqBody);

            expect(Address.find).toHaveBeenCalledWith({ userId: reqBody.userIdFromAuth });
            expect(result).toBe(mockAddresses);
        });

        test('should throw an error if getting addresses fails', async () => {
            Address.find.mockRejectedValue(new Error('Error getting addresses'));

            await expect(getAddressesOfUser(reqBody)).rejects.toThrow('Error getting addresses');
        });
    });

    describe('setDefaultAddress', () => {
        test('should set a new default address successfully', async () => {
            Address.find.mockResolvedValue(mockAddresses);
            Address.findByIdAndUpdate.mockResolvedValue(mockAddress);

            const result = await setDefaultAddress(reqBody);

            expect(Address.find).toHaveBeenCalledWith({ userId: reqBody.userIdFromAuth, isDefaultAddress: true });
            expect(mockAddresses[0].isDefaultAddress).toBe(false);
            expect(mockAddresses[0].save).toHaveBeenCalled();
            expect(Address.findByIdAndUpdate).toHaveBeenCalledWith(reqBody.addressId, { $set: { isDefaultAddress: true } }, { new: true });
            expect(result).toBe(mockAddress);
        });

        test('should throw an error if setting default address fails', async () => {
            Address.find.mockRejectedValue(new Error('Error setting default address'));

            await expect(setDefaultAddress(reqBody)).rejects.toThrow('Error setting default address');
        });
    });
});
