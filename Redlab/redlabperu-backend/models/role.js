module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: { type: DataTypes.STRING(1), defaultValue: 'A' },
  },{
    getterMethods: {
      roleStr() {
        const id = this.getDataValue('id');
        return id === 3 ? 'client' : 'employee';
      }
    }
  });

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'UserRole'
    });
    Role.belongsToMany(models.Function, {
      through: 'RoleFunction'
    });
  };

  return Role;
};