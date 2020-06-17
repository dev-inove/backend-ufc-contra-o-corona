module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('distribuition_locations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('distribuition_locations');
  },
};
