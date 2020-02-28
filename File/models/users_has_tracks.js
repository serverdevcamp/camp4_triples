/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_has_tracks', {
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
    tracks_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'tracks',
        key: 'idx'
      }
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'users_has_tracks'
  });
};
