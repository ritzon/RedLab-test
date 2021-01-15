module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    hash: DataTypes.STRING,
    expiration_date: { type: DataTypes.DATE, defaultValue: new Date() },
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  });

  Token.associate = (models) => {
    Token.belongsTo(models.User);
  };

  return Token;
};