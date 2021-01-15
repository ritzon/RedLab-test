module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: DataTypes.STRING,
      description: DataTypes.STRING(2000)
    });
    
    Category.associate = (models) => {
      Category.hasMany(models.Employee);
    };
    
    Category.addScope('defaultScope', {
      order: [['id', 'ASC']],
    }, { override: true })
  
    return Category;
};