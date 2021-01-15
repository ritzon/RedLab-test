module.exports = (sequelize, DataTypes) => {
    const PriceList = sequelize.define('PriceList', {
        name: DataTypes.STRING,
        status: {
            type: DataTypes.STRING(1),
            defaultValue: 'A'
        }
    });
    
    PriceList.associate = (models) => {
        PriceList.belongsTo(models.Agreement)
        PriceList.belongsToMany(models.Examination, {
          through: 'ExaminationPrice'
        });
    };
  
    PriceList.addScope('defaultScope', {
      order: [['name', 'ASC']],
    }, { override: true })
    return PriceList;
};