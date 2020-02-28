/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('weekly_chart', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ranked_set: {
      type: DataTypes.STRING(225),
      allowNull: true
    }
  }, {
    tableName: 'weekly_chart'
  });
};
