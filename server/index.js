// import bodyParser from 'body-parser';
// import crypto from 'crypto';
// import jsonServer from 'json-server';

// const server = jsonServer.create();
// const router = jsonServer.router('server/db.json');
// const middlewares = jsonServer.defaults();

// server.use(middlewares);
// server.use(bodyParser.json());

// const hashPassword = (password) => {
//   const salt = crypto.randomBytes(16).toString('hex');
//   const hash = crypto
//     .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
//     .toString('hex');
//   return { salt, hash };
// };

// const verifyPassword = (password, salt, hash) => {
//   const hashToVerify = crypto
//     .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
//     .toString('hex');
//   return hash === hashToVerify;
// };

// const findUserByEmail = (users, email) =>
//   users.find((user) => user.email === email);

// server.post('/signup', (req, res) => {
//   const db = router.db.getState();
//   const { email, password } = req.body;

//   if (!email || !password)
//     return res.status(400).json({ error: 'Email and password are required' });

//   if (findUserByEmail(db.users, email)) {
//     return res.status(409).json({ error: 'User already exists' });
//   }

//   const { salt, hash } = hashPassword(password);
//   const newUser = { id: crypto.randomUUID(), email, salt, hash };

//   db.users.push(newUser);
//   router.db.write();

//   return res.status(201).json({ id: newUser.id, email: newUser.email });
// });

// server.post('/signin', (req, res) => {
//   const db = router.db.getState();
//   const { email, password } = req.body;

//   if (!email || !password)
//     return res.status(400).json({ error: 'Email and password are required' });

//   const user = findUserByEmail(db.users, email);
//   if (!user || !verifyPassword(password, user.salt, user.hash)) {
//     return res.status(401).json({ error: 'Invalid email or password' });
//   }

//   return res.status(200).json({ id: user.id, email: user.email });
// });

// server.use(router);
// server.listen(3000, () => {
//   console.log('JSON Server is running on http://localhost:3000');
// });
require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');

const authRouter = require('./route/authRoute');
const projectRouter = require('./route/projectRoute');
const userRouter = require('./route/userRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(express.json());

// all routes will be here
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);

app.use(
    '*',
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
    console.log('Server up and running', PORT);
});
