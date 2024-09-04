const { addAddressController, getAddressController, setDefaultAddressController } = require('../../src/controllers/address.controller');
const { addAddress, getAddressesOfUser, setDefaultAddress } = require('../../src/services/address.service');
const { reqBody, mockAddress, mockAddresses } = require('../testData/controllersData/address.controller.testData');
const { responseMessage } = require('../../src/constants');

jest.mock('../../src/services/address.service');

describe('Address Controller Tests', () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: reqBody };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('addAddressController', () => {
        test('should return 201 and the new address when added successfully', async () => {
            addAddress.mockResolvedValue(mockAddress);

            await addAddressController(req, res, next);


            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ success: true, newAddress: mockAddress });
        });

        test('should return 400 for validation error', async () => {
            const error = new Error();
            error.name = responseMessage.validationError;
            addAddress.mockRejectedValue(error);


            await addAddressController(req, res, next);


            expect(next).toHaveBeenCalledWith({ statusCode: 400, message: error.name });
        });

        test('should return 500 for other errors', async () => {
            const error = new Error('Internal Server Error');
            addAddress.mockRejectedValue(error);


            await addAddressController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });

    describe('getAddressController', () => {
        test('should return 200 and user addresses', async () => {
            getAddressesOfUser.mockResolvedValue(mockAddresses);
            await getAddressController(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAddresses);
        });

        test('should return 400 for validation error', async () => {

            const error = new Error();
            error.name = responseMessage.validationError;
            getAddressesOfUser.mockRejectedValue(error);

            await getAddressController(req, res, next);


            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: error.name });
        });

        test('should return 500 for other errors', async () => {
            const error = new Error('Internal Server Error');
            getAddressesOfUser.mockRejectedValue(error);


            await getAddressController(req, res, next);


            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });

    describe('setDefaultAddressController', () => {
        test('should return 200 and the new default address when set successfully', async () => {
            setDefaultAddress.mockResolvedValue(mockAddress);

            await setDefaultAddressController(req, res, next);


            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ success: true, newDefaultAddress: mockAddress });
        });

        test('should return 500 for errors', async () => {
            const error = new Error('Internal Server Error');
            setDefaultAddress.mockRejectedValue(error);


            await setDefaultAddressController(req, res, next);

            expect(next).toHaveBeenCalledWith({ statusCode: 500, message: responseMessage.internalServerError });
        });
    });
});
