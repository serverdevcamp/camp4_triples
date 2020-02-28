/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    contents: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    users_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'idx'
      }
    },
    posts_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'posts',
        key: 'idx'
      }
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'comments'
  });
};
