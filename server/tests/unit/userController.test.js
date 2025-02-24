const request = require('supertest');
const app = require('../../app');  // Your Express app instance
const { sequelize } = require('../../models'); // Sequelize instance
const User = require('../../models/user'); // User model
const catchAsync = require('../../utils/catchAsync'); // Utility for async functions

jest.mock('../../models/user'); // Mocking the User model

describe('User Controller - getAllUser', () => {
  beforeAll(async () => {
    // Sync the database before running tests
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Clean up after tests
    await sequelize.close();
  });

  it('should get all users excluding the password field', async () => {
    // Mock the User.findAndCountAll method
    User.findAndCountAll.mockResolvedValue({
      count: 2,
      rows: [
        { id: 1, email: 'user1@example.com', userType: '1', password: 'hashedPassword' },
        { id: 2, email: 'user2@example.com', userType: '2', password: 'hashedPassword' },
      ],
    });

    const response = await request(app).get('/api/users'); // Adjust path to your route

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.count).toBe(2);
    expect(response.body.data.rows[0].password).toBeUndefined();
    expect(response.body.data.rows[0].email).toBe('user1@example.com');
  });

  it('should return an empty array when no users match the condition', async () => {
    // Mock the case where no users match the condition
    User.findAndCountAll.mockResolvedValue({
      count: 0,
      rows: [],
    });

    const response = await request(app).get('/api/users'); // Adjust path to your route

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.count).toBe(0);
    expect(response.body.data.rows).toEqual([]);
  });
});
