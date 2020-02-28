/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notifications', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    users_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'idx'
      }
    },
    contents: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    flag: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'notifications'
  });
};
