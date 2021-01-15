const url = require("../config").url;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Correo ya existe"
      },
      validate: {
        isEmail: {
          args: true,
          msg: "Correo no valido"
        },
        notEmpty: {
          args: true,
          msg: "Correo obligatorio"
        } 
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Contraseña no puede ser vacía"
        },
        notEmpty: {
          args: true,
          msg: "Contraseña no puede ser vacía"
        },
        len: {
          args: [4,8],
          msg: "Contraseña debe tener entre 4 y 8 caracteres"
        }
      }
    },
    urlAvatar: {
      type: DataTypes.STRING(2000),
      defaultValue: url + "/public/imgs/avatar/avatardefault.png"
    },
    status: { 
      defaultValue: "A", 
      type: DataTypes.STRING(1)
    }
  });

  User.associate = (models) => {
    User.hasOne(models.Client);
    User.hasOne(models.Employee);
    User.hasMany(models.Token);
    User.belongsToMany(models.Role, {
      through: 'UserRole'
    });
  };
  
  User.addScope('defaultScope', {
    where: {status: 'A'},
    order: [['id', 'ASC']],
  }, { override: true })

  return User;
};