'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const AppError = require('../utils/appError');

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Invalid email id',
        },
        notNull: {
          msg: 'Email cannot be null',
        },
        notEmpty: {
          msg: 'Email cannot be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password cannot be null',
        },
        notEmpty: {
          msg: 'Password cannot be empty',
        },
      },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
        if (value !== this.password) {
          throw new AppError('Password and confirm password must match', 400);
        }
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashedPassword);
      },
    },
  },
  {
    sequelize,
    modelName: 'user',
    paranoid: true,  // Allows for "soft deletes" (if you need to delete users without actually removing the data)
    freezeTableName: true,
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

module.exports = User;
