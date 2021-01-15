module.exports = (sequelize, DataTypes) => {
    const Profession = sequelize.define('Profession', {
      name: DataTypes.STRING,
      description: DataTypes.STRING(2000)
    });
    
    Profession.associate = (models) => {
      Profession.hasMany(models.Employee);
    };
  
    Profession.addScope('defaultScope', {
      order: [['id', 'ASC']],
    }, { override: true })
    return Profession;
};