module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    est: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    act: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  return Task;
};
