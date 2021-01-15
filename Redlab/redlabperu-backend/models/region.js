module.exports = (sequelize, DataTypes) => {
    const Region = sequelize.define('Region', {
        id: { 
            type: DataTypes.STRING, 
            primaryKey: true 
        },
        name: DataTypes.STRING,
    });
    
    Region.associate = (models) => {
        Region.hasMany(models.Province)
    };
  
    Region.addScope('defaultScope', {
        order: [['name', 'ASC']],
    }, { override: true })
    return Region;
};