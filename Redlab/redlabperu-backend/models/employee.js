const C = require('../config/properties/constants');
const helper = require("../global/helpers");

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    dni: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "DNI ya existe"
      }
    },
    admissionDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
      get: function() {
        return helper.convertUsToEuDate(this.getDataValue('admissionDate'));
      },
      set: function(val) {
        this.setDataValue('admissionDate', helper.convertEuToUsDate(val));
      }
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
      get: function() {
        return helper.convertUsToEuDate(this.getDataValue('birthDate'));
      },
      set: function(val) {
        this.setDataValue('birthDate', helper.convertEuToUsDate(val));
      }
    },
    name: DataTypes.STRING,
    lastNameP: DataTypes.STRING,
    lastNameM: DataTypes.STRING,
    gender: DataTypes.STRING(1),
    civilStatus: DataTypes.STRING(1),
    phoneNumber: DataTypes.STRING,
    tlfNumber: DataTypes.STRING,
    //profession: DataTypes.STRING,
    digitalSignatureUrl: DataTypes.STRING(500),
    tuitionNumber: DataTypes.STRING,
    tuitionNumber2: DataTypes.STRING,
    address: DataTypes.STRING(500),
    referencePoint: DataTypes.STRING(500),
    address: DataTypes.STRING(500),
    typeDirection: DataTypes.STRING(1),
    status: { 
      defaultValue: "A", 
      type: DataTypes.STRING(1)
    }
  },{
    hooks: {
      afterCreate: (employee, options) => {
        let code = `T0${employee.id}`;
        return employee.update({
          code, 
          where: {
            id: employee.id
          },
        },{
          transaction: options.transaction
        });
      },
    },
    getterMethods: {
      genderStr() {
        const genderValue = this.getDataValue('gender');
        return C.GENDER_STR[genderValue];
      },
      civilStatusStr() {
        const civilStatusValue = this.getDataValue('civilStatus');
        return C.CIVIL_STATUS_STR[civilStatusValue];
      },
      typeDirectionStr() {
        const typeDirectionValue = this.getDataValue('typeDirection');
        return C.TYPE_DIRECTION_STR[typeDirectionValue];
      },
      fullName() {
        return `${this.getDataValue('name')} ${this.getDataValue('lastNameP')} ${this.getDataValue('lastNameM')}`
      },
      birthDateUS() {
        return this.getDataValue('birthDate') || "";
      },
      admissionDateUS() {
        return this.getDataValue('admissionDate') || "";
      },
    }
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.User);
    Employee.belongsTo(models.TypeDoc);
    Employee.belongsTo(models.TypeEmployee);
    Employee.belongsTo(models.Speciality);
    Employee.belongsTo(models.Category);
    Employee.belongsTo(models.Profession);
    Employee.belongsTo(models.Tuition);
    Employee.belongsTo(models.Tuition, { as: 'Tuition2' });
    Employee.belongsTo(models.District);
    Employee.belongsTo(models.Headquarter);
    Employee.hasMany(models.Appointment);
  };
  
  Employee.addScope('defaultScope', {
    where: {status: 'A'},
    order: [['id', 'ASC']],
  }, { override: true })

  return Employee;
};