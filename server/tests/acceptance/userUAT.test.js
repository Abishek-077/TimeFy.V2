const request = require('supertest');
const app = require('../../app');

describe('User Acceptance Tests', () => {
    test('User logs in and logs out successfully', async () => {
        const loginRes = await request(app).post('/api/login').send({
            email: 'test@example.com',
            password: '123456',
        });

        expect(loginRes.statusCode).toBe(200);
        expect(loginRes.body.token).toBeDefined();

        const logoutRes = await request(app).post('/api/logout');
        expect(logoutRes.statusCode).toBe(200);
        expect(logoutRes.body.message).toBe('Logged out successfully');
    });
});
