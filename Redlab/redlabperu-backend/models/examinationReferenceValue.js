module.exports = (sequelize, DataTypes) => {
  const ExaminationReferenceValue = sequelize.define('ExaminationReferenceValue', {
    allValues: DataTypes.STRING(1000),
    group: DataTypes.STRING,
  });
  
  return ExaminationReferenceValue;
};