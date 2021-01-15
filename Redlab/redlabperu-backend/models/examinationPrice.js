module.exports = (sequelize, DataTypes) => {
    const ExaminationPrice = sequelize.define('ExaminationPrice', {
        price: DataTypes.FLOAT
    });
    
    ExaminationPrice.associate = (models) => {
        ExaminationPrice.belongsTo(models.PriceList);
        ExaminationPrice.belongsTo(models.Examination);
    };
  
    return ExaminationPrice;
};