require('dotenv').config({ path: `${process.cwd()}/.env` });

const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const userRouter = require('./routes/userRoutes');

const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(express.json());

app.use(cors({ origin: 'http://localhost:5173' })); // Removed spaces

// All routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

app.use(
    '*',
    catchAsync(async (req, res, next) => {
        throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 5000;

// Prevents starting the server during testing
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log('Server up and running on port', PORT);
    });
}

module.exports = app;
