const { addReview, deleteReview } = require("../../src/services/review.service");
const { Review } = require('../../src/models/Review.model');
const { mockReview, mockReviewResponse, mockUser, mockProduct, mockDeleteReview } = require("../testData/controllersData/review.controller.testData");

jest.mock("../../src/models/Review.model");

describe("Review Controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("addReview", () => {
        it("should add a new review", async () => {
            Review.create.mockResolvedValue(mockReviewResponse);

            const req = {
                body: {
                    user: mockUser, 
                    rating: 5,
                    content: "Great product!",
                    productId: "mockProductId"
                }
            };

            await addReview(req);

            expect(Review.create).toHaveBeenCalledWith({
                ...mockReview,
                username: mockUser.username,
                userId: mockUser._id,
                productId: mockProduct._id,
                rating: mockReview.rating
            });
            
        });
    });

    describe("deleteReview", () => {
        it("should delete a review", async () => {
            const mockReviewInstance = {
                deleteOne: jest.fn().mockResolvedValue({})
            };

            const mockFindOne = jest.spyOn(Review, 'findOne').mockResolvedValue(mockReviewInstance);

            const req = {
                body: {
                    ...mockDeleteReview
                }
            };

            await deleteReview(req);

            expect(mockFindOne).toHaveBeenCalledWith({ _id: mockDeleteReview.review._id });
            expect(mockReviewInstance.deleteOne).toHaveBeenCalled();
        });
    });
});
