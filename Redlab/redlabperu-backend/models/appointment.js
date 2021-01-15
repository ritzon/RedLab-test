const helper = require("../global/helpers");

const status = {
  'S': "Solicitada",
  'C': "Confirmada",
  'E': "Ejecutada",
  'D': "Eliminada"
}

const colorStatus = {
  'S': {
      primary: "#E3BC08",
      secondary: "#FDF1BA"
    },
  'C': {
      primary: "#AD2121",
      secondary: "#FAE3E3"
    },
  'E': {
      primary: "#1E90FF",
      secondary: "#D1E8FF"
    },
}

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    code: {
      type: DataTypes.STRING,
      notEmpty: {
        args: true,
        msg: "Codigo no puede ser vacio"
      },
      unique: {
        args: true,
        msg: "Codigo ya existe"
      }
    },
    time: {
      type: DataTypes.TIME,
      defaultValue: '00:00',
      notEmpty: {
        args: true,
        msg: "Hora no puede ser vacio"
      },
    },
    dateAppointment: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          args: true,
          msg: "Debe ser una Fecha"
        }
      },
      notEmpty: {
        args: true,
        msg: "Fecha no puede ser vacio"
      },
      set: function(val) {
        this.setDataValue('dateAppointment', helper.convertEuToUsDate(val));
      }
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      validate: {
        isFloat: true
      },
      notEmpty: {
        args: true,
        msg: "Total precio no puede ser vacio"
      },
    },
    status: {
      type: DataTypes.STRING(1),
      defaultValue: "S"
    },
    result: DataTypes.STRING
  }, {
    hooks: {
      afterCreate: (appointment, options) => {
        let code = `C0${appointment.id}`;
        return appointment.update({
          code, 
          where: {
            id: appointment.id
          },
          transaction: options.transaction
        });
      },
    },
    getterMethods: {
      statusStr() {
        const statusValue = this.getDataValue('status');
        return status[statusValue];
      },
      colorStatus() {
        const statusValue = this.getDataValue('status');
        return colorStatus[statusValue];
      },
      dateAppointmentUS() {
        let dateAppointment = this.getDataValue('dateAppointment') || "";
        return dateAppointment.replace(/-/g,'/')
      },
      dateAppointmentEU() {
        let dateAppointment = this.getDataValue('dateAppointment');
        return dateAppointment ? helper.convertUsToEuDate(dateAppointment) : "";
      },
      dateAppointmentUSv2() {
        let dateAppointment = this.getDataValue('dateAppointment') || "";
        return dateAppointment.replace(/-/g,',')
      },
      time12h() {
        let time = this.getDataValue('time') || "";
        return helper.convert24hTo12h(time);
      },
      createdDate() {
        let date = this.getDataValue('createdAt');
        if(date){
          let month = date.getMonth() + 1;
          let auxMonth = month >=10 ? '1' : '0';
          let auxDay = date.getDate() < 10 ? '0' : '';
          return `${date.getFullYear()}-${auxMonth}${date.getMonth()+1}-${auxDay}${date.getDate()}`;
        }
        return ''
      }
    }
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Client);
    Appointment.belongsTo(models.Employee, { as: 'Responsible' });
    Appointment.belongsTo(models.PriceList);
    Appointment.belongsTo(models.Headquarter);

    Appointment.belongsToMany(models.Examination, {
      through: 'AppointmentDetail'
    });
    
  };

  return Appointment;
};
