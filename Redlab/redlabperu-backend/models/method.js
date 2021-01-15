module.exports = (sequelize, DataTypes) => {
    const Method = sequelize.define('Method', {
      name: DataTypes.STRING,
      description: DataTypes.STRING
    });
    
    Method.associate = (models) => {
        Method.hasMany(models.Examination);
    };
    return Method;
  };