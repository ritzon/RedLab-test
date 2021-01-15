module.exports = (sequelize, DataTypes) => {
  const ReferenceValue = sequelize.define('ReferenceValue', {
    name: DataTypes.STRING,
    unit: DataTypes.STRING,
  });

  ReferenceValue.associate = (models) => {
    ReferenceValue.belongsToMany(models.Examination, {
      through: 'ExaminationReferenceValue'
    });
    ReferenceValue.belongsToMany(models.AppointmentDetail, {
      through: 'ExaminationDetail'
    });
  };
  
  ReferenceValue.addScope('defaultScope', {
    order: [['name', 'ASC']],
  }, { override: true })

  return ReferenceValue;
};