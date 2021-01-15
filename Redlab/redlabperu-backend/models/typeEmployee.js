module.exports = (sequelize, DataTypes) => {
  const TypeEmployee = sequelize.define('TypeEmployee', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  });

  TypeEmployee.associate = (models) => {
    TypeEmployee.hasMany(models.Employee);
  };
  
  TypeEmployee.addScope('defaultScope', {
    order: [['id', 'ASC']],
  }, { override: true })

  return TypeEmployee;
};