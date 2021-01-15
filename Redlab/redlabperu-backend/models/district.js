module.exports = (sequelize, DataTypes) => {
    const District = sequelize.define('District', {
        id: { 
            type: DataTypes.STRING, 
            primaryKey: true
        },
        name: DataTypes.STRING,
    });
    
    District.associate = (models) => {
        District.belongsTo(models.Province)
        District.hasMany(models.Employee)
        District.hasMany(models.Client)
    };
  
    District.addScope('defaultScope', {
      order: [['name', 'ASC']],
    }, { override: true })
    return District;
};