/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('track_genres', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'track_genres'
  });
};
