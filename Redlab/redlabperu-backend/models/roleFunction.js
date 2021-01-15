module.exports = (sequelize, DataTypes) => {
  const RoleFunction = sequelize.define('RoleFunction', {
    canView: { type: DataTypes.BOOLEAN, defaultValue: true },
    canEdit: { type: DataTypes.BOOLEAN, defaultValue: true },
    canDelete: { type: DataTypes.BOOLEAN, defaultValue: true },
    canCreate: { type: DataTypes.BOOLEAN, defaultValue: true },
  });
  
  return RoleFunction;
};