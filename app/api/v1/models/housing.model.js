module.exports = (sequelize, Sequelize) => {
  const Housing = sequelize.define('housing', {
    title: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DOUBLE,
    },
    numBedroom: {
      type: Sequelize.INTEGER,
    },
    numBathroom: {
      type: Sequelize.DOUBLE,
    },
    squarefoot: {
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING,
    },
    images: {
      type: Sequelize.STRING,
    },
    sold: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Housing;
};
