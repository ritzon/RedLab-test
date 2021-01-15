module.exports = (sequelize, DataTypes) => {
    const TypeDoc = sequelize.define('TypeDoc', {
      name: DataTypes.STRING,
      description: DataTypes.STRING(2000)
    });
    
    TypeDoc.associate = (models) => {
      TypeDoc.hasMany(models.Employee);
      TypeDoc.hasMany(models.Client);
    };
  
    TypeDoc.addScope('defaultScope', {
      order: [['id', 'ASC']],
    }, { override: true })
    return TypeDoc;
};