/* jshint indent: 2 */


module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    idx: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    pw: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    profile: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    follower_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    following_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    tracks_count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    grade: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    created_dt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    access_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_dt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    refresh_token: {
      type: DataTypes.STRING(225),
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: false
  });
};
