'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const AppError = require('../utils/appError');

class User extends Model {
  // Method to check password during login
  async checkPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure unique emails
      validate: {
        isEmail: {
          msg: 'Invalid email ID',
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1', // Assuming 1 is a normal user, 0 is admin
    },
  },
  {
    sequelize,
    modelName: 'user',
    paranoid: true, // Soft delete enabled
    freezeTableName: true,
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

module.exports = User;

// 'use strict';
// const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
// const sequelize = require('../config/database');
// const AppError = require('../utils/appError');

// class User extends Model {
//    // Method to check password during login
//    async checkPassword(password) {
//     return bcrypt.compare(password, this.password);
//   }
// }

// User.init(
//   {
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         isEmail: {
//           msg: 'Invalid email id',
//         },
//         notNull: {
//           msg: 'Email cannot be null',
//         },
//         notEmpty: {
//           msg: 'Email cannot be empty',
//         },
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: 'Password cannot be null',
//         },
//         notEmpty: {
//           msg: 'Password cannot be empty',
//         },
//       },
//     },
//     confirmPassword: {
//       type: DataTypes.VIRTUAL,
//       set(value) {
//         if (value !== this.password) {
//           throw new AppError('Password and confirm password must match', 400);
//         }
//         const hashedPassword = bcrypt.hashSync(value, 10);
//         this.setDataValue('password', hashedPassword);
//       },
//     },
//   },
//   {
//     sequelize,
//     modelName: 'user',
//     paranoid: true,  // Allows for "soft deletes" (if you need to delete users without actually removing the data)
//     freezeTableName: true,
//     timestamps: true, // Automatically adds `createdAt` and `updatedAt`
//   }
// );

// module.exports = User;
