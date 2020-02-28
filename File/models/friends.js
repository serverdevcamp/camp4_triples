/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friends', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sender_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'idx'
      }
    },
    receiver_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'idx'
      }
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'friends'
  });
};
