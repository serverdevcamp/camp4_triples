/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tracks', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    genre_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'track_genres',
        key: 'idx'
      }
    },
    type_idx: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'track_types',
        key: 'idx'
      }
    },
    track_source: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    flag: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    users_idx: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    played_count: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    moods: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tracks',
    timestamps: false
  });
};
