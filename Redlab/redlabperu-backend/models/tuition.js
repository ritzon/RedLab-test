module.exports = (sequelize, DataTypes) => {
    const Tuition = sequelize.define('Tuition', {
      name: DataTypes.STRING,
      description: DataTypes.STRING(2000)
    });
    
    Tuition.associate = (models) => {
      Tuition.hasMany(models.Employee);
    };
    
    Tuition.addScope('defaultScope', {
      order: [['id', 'ASC']],
    }, { override: true })
  
    return Tuition;
};