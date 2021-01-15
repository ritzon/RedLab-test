module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });
  
  Service.associate = (models) => {
    Service.hasMany(models.Examination);
  };

  return Service;
};