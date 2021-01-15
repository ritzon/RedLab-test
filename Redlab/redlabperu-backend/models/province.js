module.exports = (sequelize, DataTypes) => {
    const Province = sequelize.define('Province', {
        id: { 
            type: DataTypes.STRING, 
            primaryKey: true 
        },
        name: DataTypes.STRING,
    });
    
    Province.associate = (models) => {
        Province.belongsTo(models.Region)
        Province.hasMany(models.District)
    };
  
    Province.addScope('defaultScope', {
      order: [['name', 'ASC']],
    }, { override: true })
    return Province;
};