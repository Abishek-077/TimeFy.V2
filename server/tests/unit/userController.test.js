// tests/unit/userController.test.js
const { sequelize, User } = require('../../models');
const request = require('supertest');
const app = require('../../app');

// Initialize Sequelize before tests
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Clean up after tests
afterAll(async () => {
  await sequelize.close();
});

test('should create a user', async () => {
  const response = await request(app).post('/api/users').send({
    username: 'testuser',
    password: 'password123',
  });
  expect(response.status).toBe(201);
});
