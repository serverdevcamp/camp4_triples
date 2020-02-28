/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rooms', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    users_idx_1: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'idx'
      }
    },
    users_idx_2: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'idx'
      }
    },
    last_message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_dt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'rooms'
  });
};
