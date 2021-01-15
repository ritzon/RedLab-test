module.exports = (sequelize, DataTypes) => {
    const Speciality = sequelize.define('Speciality', {
      name: DataTypes.STRING,
      description: DataTypes.STRING(2000)
    });
    
    Speciality.associate = (models) => {
      Speciality.hasMany(models.Employee);
    };
  
    Speciality.addScope('defaultScope', {
      order: [['id', 'ASC']],
    }, { override: true })
    return Speciality;
};