module.exports = (sequelize, DataTypes) => {
  const Agreement = sequelize.define('Agreement', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    ruc: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "RUC ya existe"
      }
    },
    email: DataTypes.STRING,
    tlfNumber: DataTypes.STRING,
    description: DataTypes.STRING
  });

  Agreement.associate = (models) => {
    Agreement.hasMany(models.PriceList);
    Agreement.belongsTo(models.TypeAgreement);
  };

  return Agreement;
};