const mockOrder = {
    _id: 'mockOrderId',
    userId: 'mockUserId',
    productsOrdered: [
        {
            productVariationId: 'mockProductVariationId',
            quantity: 1
        }
    ],
    addressId: 'mockAddressId',
    totalPrice: 100,
    status: 'Pending'
};

const mockOrders = [mockOrder];

module.exports = {
    mockOrder,
    mockOrders
};
