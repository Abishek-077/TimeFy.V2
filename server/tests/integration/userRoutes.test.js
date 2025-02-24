const request = require('supertest');
const app = require('../../app');

describe('User Routes', () => {
    test('should register a user successfully', async () => {
        const res = await request(app).post('/api/register').send({
            email: 'test@example.com',
            password: '123456',
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe('User registered successfully');
    });

    test('should fail login with incorrect password', async () => {
        const res = await request(app).post('/api/login').send({
            email: 'test@example.com',
            password: 'wrongpassword',
        });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Invalid credentials');
    });
});
