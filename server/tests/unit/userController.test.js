const request = require('supertest');
const app = require('../../app'); // Adjust the path as necessary
const { sequelize, User } = require('../../models'); // Adjust to import the correct models

describe('User Controller - getAllUser', () => {
    let token;

    beforeAll(async () => {
        console.log('Syncing database...');
        // Sync the database (reset tables)
        await sequelize.sync({ force: true });

        console.log('Creating a test user...');
        // Create a test user in the database
        await User.create({
            email: 'admin@example.com',
            password: 'password',
            role: '0', // Admin role
        });

        console.log('Performing login to get token...');
        // Perform login to get the token with role '0' (admin)
        const response = await request(app)
            .post('/api/v1/auth')
            .send({ email: 'admin@example.com', password: 'password' });

        console.log('Login response:', response.body); // Log login response for debugging
        token = response.body.token;

        if (!token) {
            throw new Error('Login failed, no token received');
        }
    });

    it('should get all users excluding the password field', async () => {
        console.log('Sending request to get all users...');
        const response = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`);

        console.log('Get all users response:', response.body); // Log the response for debugging

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.count).toBeGreaterThan(0);
        expect(response.body.data.rows[0].password).toBeUndefined();
    });

    it('should return an empty array when no users match the condition', async () => {
        console.log('Clearing users...');
        // Clear users or ensure no users match the condition
        await User.destroy({ where: {} });

        console.log('Sending request to get all users...');
        const response = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`);

        console.log('Get all users (empty) response:', response.body); // Log the response for debugging

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.count).toBe(0);
        expect(response.body.data.rows).toEqual([]);
    });

    afterAll(async () => {
        console.log('Cleaning up test data...');
        // Clean up the test data
        await User.destroy({ where: {} });

        console.log('Resetting tables...');
        // Optionally, reset all tables
        await sequelize.sync({ force: true });
    });
});
