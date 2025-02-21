const user = require('../db/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d', // Default expiry
    });
};

const signup = catchAsync(async (req, res, next) => {
    const { userType, firstName, lastName, email, password, confirmPassword } = req.body;

    if (!['1', '2'].includes(userType)) {
        return next(new AppError('Invalid user Type', 400));
    }

    if (password !== confirmPassword) {
        return next(new AppError('Passwords do not match', 400));
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await user.create({
        userType,
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    if (!newUser) {
        return next(new AppError('Failed to create the user', 400));
    }

    const result = newUser.toJSON();
    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({ id: result.id });

    return res.status(201).json({
        status: 'success',
        data: result,
    });
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    const result = await user.findOne({ where: { email } });
    if (!result || !(await bcrypt.compare(password, result.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = generateToken({ id: result.id });

    return res.json({
        status: 'success',
        data: {
            id: result.id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            userType: result.userType,
            token,
        },
    });
});

const authentication = catchAsync(async (req, res, next) => {
    let idToken = '';
    if (req.headers.authorization?.startsWith('Bearer')) {
        idToken = req.headers.authorization.split(' ')[1];
    }

    if (!idToken) {
        return next(new AppError('Please login to get access', 401));
    }

    try {
        const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
        const freshUser = await user.findByPk(tokenDetail.id);

        if (!freshUser) {
            return next(new AppError('User no longer exists', 400));
        }

        req.user = freshUser;
        next();
    } catch (error) {
        return next(new AppError('Invalid or expired token', 401));
    }
});

const restrictTo = (...userTypes) => {
    return (req, res, next) => {
        if (!userTypes.includes(req.user.userType)) {
            return next(new AppError("You don't have permission to perform this action", 403));
        }
        next();
    };
};

module.exports = { signup, login, authentication, restrictTo };
