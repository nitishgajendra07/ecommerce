const reqBody = {
    username: 'punithraj',
    email: 'punith@gmail.com'
};

const mockUserAdmin = { id: 'user123', username: 'punithraj', isAdmin: true, save: jest.fn() };
const mockUserNormal = { id: 'user123', username: 'mohan', isAdmin: false, save: jest.fn() };
const mockUsersList = [
    { id: 'user123', username: 'ranjan', isAdmin: false },
    { id: 'user124', username: 'mohan', isAdmin: false }
];

module.exports = {
    reqBody,
    mockUserAdmin,
    mockUserNormal,
    mockUsersList
};
