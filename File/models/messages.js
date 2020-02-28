/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false
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
    room_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'rooms',
        key: 'idx'
      }
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'messages'
  });
};
