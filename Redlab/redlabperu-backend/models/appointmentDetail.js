module.exports = (sequelize, DataTypes) => {
  const AppointmentDetail = sequelize.define('AppointmentDetail', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    }
  });
  
  AppointmentDetail.associate = (models) => {
    AppointmentDetail.belongsTo(models.Examination);
    AppointmentDetail.belongsTo(models.Appointment);
    AppointmentDetail.belongsToMany(models.ReferenceValue, {
      through: 'ExaminationDetail'
    });
  };
  return AppointmentDetail;
};