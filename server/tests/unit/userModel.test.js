const { Sequelize } = require('sequelize');
const User = require('../../models/user'); // Path to your user model

describe('User Model', () => {
  let sequelize;

  beforeAll(async () => {
    // Using SQLite in-memory database for testing
    sequelize = new Sequelize('sqlite::memory:', { logging: false });

    // Initialize the User model with the Sequelize instance
    User.init(User.rawAttributes, { sequelize, modelName: 'user' });

    // Sync the model to create tables
    await sequelize.sync();
  });

  afterAll(async () => {
    // Close the Sequelize connection after tests
    await sequelize.close();
  });

  test('should create a user', async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(user.email).toBe('test@example.com');
  });

  test('should throw error if passwords do not match', async () => {
    try {
      await User.create({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'differentpassword',
      });
    } catch (error) {
      expect(error).toHaveProperty('message', 'Password and confirm password must match');
    }
  });
});
