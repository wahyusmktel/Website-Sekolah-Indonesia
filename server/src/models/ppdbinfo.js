'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PPDBInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PPDBInfo.init({
    academic_year: DataTypes.STRING,
    registration_link: DataTypes.STRING,
    contact_person: DataTypes.STRING,
    description: DataTypes.TEXT,
    admission_pathways: DataTypes.JSON,
    timeline: DataTypes.JSON,
    required_documents: DataTypes.JSON,
    fees: DataTypes.JSON,
    faq: DataTypes.JSON,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'PPDBInfo',
  });
  return PPDBInfo;
};