module.exports = (sequelize, DataTypes) => {
    const Examination = sequelize.define('Examination', {
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        indications: DataTypes.STRING(3000),
        typeSample: DataTypes.STRING,
        volume: DataTypes.STRING,
        supplies: DataTypes.STRING,
        storageTemperature: DataTypes.STRING,
        fastingConditions: DataTypes.STRING,
        runFrequency: DataTypes.STRING,
        processTime: DataTypes.STRING,
        reportTime: DataTypes.STRING,
        status: { 
          defaultValue: "A", 
          type: DataTypes.STRING(1)
        },
    },{
      hooks: {
        afterCreate: (examination, options) => {
          let code = `E0${examination.id}`;
          return examination.update({
            code, 
            where: {
              id: examination.id
            },
            transaction: options.transaction
          });
        },
      },
    });
    
    Examination.associate = (models) => {
        Examination.belongsTo(models.Service);
        Examination.belongsTo(models.Method);
        Examination.belongsToMany(models.ReferenceValue, {
          through: 'ExaminationReferenceValue'
        });
        Examination.belongsToMany(models.Appointment, {
          through: 'AppointmentDetail'
        });
        Examination.belongsToMany(models.PriceList, {
          through: 'ExaminationPrice'
        });
    };
  
    Examination.addScope('defaultScope', {
        order: [['name', 'ASC']],
        where: {status: 'A'}
    }, { override: true })
    return Examination;
};