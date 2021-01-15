module.exports = (sequelize, DataTypes) => {
  const TypeAgreement = sequelize.define('TypeAgreement', {
    name: DataTypes.STRING,
    description: DataTypes.STRING(2000)
  });
  
  TypeAgreement.associate = (models) => {
    TypeAgreement.hasMany(models.Agreement);
  };

  TypeAgreement.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })
  return TypeAgreement;
};