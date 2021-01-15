module.exports = (sequelize, DataTypes) => {
  const RoleFunction = sequelize.define('Function', {
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    icon: DataTypes.STRING,
    typeApplication: {
      type: DataTypes.STRING(1),
      defaultValue: 'I'
    }
  });
  
  RoleFunction.associate = (models) => {
    RoleFunction.belongsTo(models.Function, { as: 'parent', foreignKey: 'parent_id' });
    RoleFunction.hasMany(models.Function, { as: 'children', foreignKey: 'parent_id' });
    RoleFunction.belongsToMany(models.Role, {
      through: 'RoleFunction',
    });
  };

  return RoleFunction;
};