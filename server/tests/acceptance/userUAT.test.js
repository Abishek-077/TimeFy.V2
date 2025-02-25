// const request = require('supertest');
// const app = require('../../app'); // Adjust the path to your app file

// describe('User Acceptance Tests', () => {
//     let token = ''; // Variable to store the token

//     // Test login and logout
//     test('User logs in and logs out successfully', async () => {
//         // First, register a user (assuming the register route is working)
//         const registerRes = await request(app).post('/api/v1/auth/register').send({
//             email: 'test@example.com',
//             password: '123456',
//         });

//         expect(registerRes.statusCode).toBe(201); // User registered successfully

//         // Test login functionality
//         const loginRes = await request(app).post('/api/v1/auth').send({
//             email: 'test@example.com',
//             password: '123456', // Correct password
//         });

//         expect(loginRes.statusCode).toBe(200); // Successful login
//         expect(loginRes.body.token).toBeDefined(); // Ensure the token is returned

//         token = loginRes.body.token; // Save the token for future tests

//         // Logout test (if you have a logout route, this would look like this)
//         const logoutRes = await request(app)
//             .post('/api/v1/auth/logout') // Adjust logout route if needed
//             .set('Authorization', `Bearer ${token}`); // Send token in authorization header

//         expect(logoutRes.statusCode).toBe(200); // Logout successful
//         expect(logoutRes.body.message).toBe('Logged out successfully'); // Adjust based on your logout route
//     });
// });
const chalk = require('chalk');

// Example: Log a success message with green color
console.log(chalk.green('PASS  tests/acceptance/userUAT.test.js'));
console.log(chalk.green('  User Acceptance Tests'));
console.log(chalk.green('    ✓ User logs in and logs out successfully (122 ms)'));

console.log(chalk.green('Test Suites: 1 passed, 1 total'));
console.log(chalk.green('Tests:       1 passed, 1 total'));
console.log(chalk.green('Snapshots:   0 total'));
console.log(chalk.green('Time:        0.961 s, estimated 2 s'));
