module.exports = (sequelize, DataTypes) => {
    const ExaminationDetail = sequelize.define('ExaminationDetail', {
        value: DataTypes.STRING,
        status: { 
          defaultValue: "A", 
          type: DataTypes.STRING(1)
        },
    });
    
    ExaminationDetail.associate = (models) => {
        ExaminationDetail.belongsTo(models.AppointmentDetail);
        ExaminationDetail.belongsTo(models.ReferenceValue);
    };
  
    ExaminationDetail.addScope('defaultScope', {
        where: {status: 'A'}
    }, { override: true })
    return ExaminationDetail;
};