const {url, port} = require("../config");

module.exports = (sequelize, DataTypes) => {
  const Headquarter = sequelize.define('Headquarter', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    tlfNumber: DataTypes.STRING,
    urlImage: {
      type: DataTypes.STRING(2000),
      defaultValue: `${url}:${port}/public/imgs/headquarter/dark-material-bg.jpg`
    }
  });

  Headquarter.associate = (models) => {
    Headquarter.hasMany(models.Appointment);
    Headquarter.hasMany(models.Employee);
  };

  return Headquarter;
};