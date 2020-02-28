/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    contents: {
      type: DataTypes.STRING(500),
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
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    track_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tracks',
        key: 'idx'
      }
    },
    tags: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    comments_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    likes_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'posts'
  });
};
