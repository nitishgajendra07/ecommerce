const { addToCart, getCart, removeFromCart } = require("../../src/services/cart.service");
const { Cart } = require("../../src/models/cart.model");
const { Product } = require("../../src/models/product.model");
const { ProductVariation } = require("../../src/models/productVariation.model");
const { responseMessage } = require("../../src/constants");
const { mockProduct, mockProductVariation, mockCart } = require("../testData/controllersData/cart.controller.testData");

jest.mock("../../src/models/cart.model");
jest.mock("../../src/models/product.model");
jest.mock("../../src/models/productVariation.model");

describe("Cart Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("addToCart", () => {
        it("should add a new item to the cart", async () => {
            Product.findOne.mockResolvedValue({ _id: mockProduct._id });
            ProductVariation.findOne.mockResolvedValue(mockProductVariation);
            Cart.findOne.mockResolvedValue(null);
            Cart.create.mockResolvedValue(mockCart);

            const body = {
                productName: mockProduct.name,
                chosenVariation: mockProductVariation.variation,
                userIdFromAuth: mockCart.userId
            };

            const cart = await addToCart(body);

            expect(Product.findOne).toHaveBeenCalledWith({ name: body.productName }, {});
            expect(ProductVariation.findOne).toHaveBeenCalledWith({ productId: { _id: mockProduct._id }, variation: body.chosenVariation });
            expect(Cart.findOne).toHaveBeenCalledWith({ userId: body.userIdFromAuth });
            expect(Cart.create).toHaveBeenCalledWith({
                userId: body.userIdFromAuth,
                activeCartItems: [
                    { productVariationId: mockProductVariation._id }
                ]
            });
            expect(cart).toEqual(mockCart);
        });

        it("should update the quantity of an existing item in the cart", async () => {
            const updatedCart = { ...mockCart, activeCartItems: [{ ...mockCart.activeCartItems[0], quantity: 2 }] };

            Product.findOne.mockResolvedValue({ _id: mockProduct._id });
            ProductVariation.findOne.mockResolvedValue(mockProductVariation);
            Cart.findOne.mockResolvedValue({
                ...mockCart,
                save: jest.fn().mockResolvedValue(updatedCart)
            });

            const body = {
                productName: mockProduct.name,
                chosenVariation: mockProductVariation.variation,
                userIdFromAuth: mockCart.userId
            };

            const cart = await addToCart(body);

            expect(Product.findOne).toHaveBeenCalledWith({ name: body.productName }, {});
            expect(ProductVariation.findOne).toHaveBeenCalledWith({ productId: { _id: mockProduct._id }, variation: body.chosenVariation });
            expect(Cart.findOne).toHaveBeenCalledWith({ userId: body.userIdFromAuth });
            expect(cart).toEqual(updatedCart);
        });
    });

    describe("getCart", () => {
        it("should get the cart for the user", async () => {
            const mockPopulate = jest.fn().mockResolvedValue(mockCart);
            Cart.findOne.mockReturnValue({ populate: mockPopulate });

            const body = {
                userIdFromAuth: mockCart.userId
            };

            const cart = await getCart(body);

            expect(Cart.findOne).toHaveBeenCalledWith({ userId: body.userIdFromAuth });
            expect(mockPopulate).toHaveBeenCalledWith({ path: "activeCartItems.productVariationId" });
            expect(cart).toEqual(mockCart);
        });
    });

    describe("removeFromCart", () => {
        it("should remove an item from the cart", async () => {
            const updatedCart = { ...mockCart, activeCartItems: [] };

            Product.findOne.mockResolvedValue({ _id: mockProduct._id });
            ProductVariation.findOne.mockResolvedValue(mockProductVariation);
            Cart.findOne.mockResolvedValue({
                ...mockCart,
                save: jest.fn().mockResolvedValue(updatedCart)
            });

            const body = {
                productName: mockProduct.name,
                chosenVariation: mockProductVariation.variation,
                userIdFromAuth: mockCart.userId
            };

            const cart = await removeFromCart(body);

            expect(Product.findOne).toHaveBeenCalledWith({ name: body.productName }, {});
            expect(ProductVariation.findOne).toHaveBeenCalledWith({ productId: { _id: mockProduct._id }, variation: body.chosenVariation });
            expect(Cart.findOne).toHaveBeenCalledWith({ userId: body.userIdFromAuth });
            expect(cart.save).toHaveBeenCalled();
            expect(cart.activeCartItems.length).toBe(0);
        });
    });
});