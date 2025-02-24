const { User } = require('../../models');

describe('User Model', () => {
    test('should create a new user', async () => {
        const user = await User.create({ email: 'test@example.com', password: 'hashedPassword' });
        expect(user.email).toBe('test@example.com');
    });
});
