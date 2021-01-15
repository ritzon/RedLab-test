const helper = require("../global/helpers");
const C = require('../config/properties/constants');

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    dni: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "DNI ya existe"
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
    code: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Codigo ya existe"
      }
    },
    historyNumber: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Número de historia clínica ya existe"
      }
    },
    name: DataTypes.STRING,
    lastNameP: DataTypes.STRING,
    lastNameM: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    tlfNumber: DataTypes.STRING,
    gender: DataTypes.STRING(1),
    civilStatus: DataTypes.STRING(1),
    nationality: DataTypes.STRING,
    address: DataTypes.STRING,
    status: { 
      defaultValue: "A", 
      type: DataTypes.STRING(1)
    }
  },{
    hooks: {
      afterCreate: (client, options) => {
        let code = `P0${client.id}`;
        return client.update({
          code, 
          where: {
            id: client.id
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
      birthDateUS() {
        return this.getDataValue('birthDate') || "";
      },
      years() {
        const birthDate = this.getDataValue('birthDate');
        const today = new Date().getFullYear();
        const years = today - birthDate.substring(0,4);
        return years;
      },
      civilStatusStr() {
        const civilStatusValue = this.getDataValue('civilStatus');
        return C.CIVIL_STATUS_STR[civilStatusValue];
      },
      fullName() {
        return `${this.getDataValue('name')} ${this.getDataValue('lastNameP')} ${this.getDataValue('lastNameM')}`
      },
    }
  });

  Client.associate = (models) => {
    Client.hasMany(models.Appointment);
    Client.belongsTo(models.User);
    Client.belongsTo(models.TypeDoc);
    Client.belongsTo(models.District);
  };
  
  Client.addScope('defaultScope', {
    where: {status: 'A'},
    order: [['id', 'ASC']],
  }, { override: true })
  return Client;
};