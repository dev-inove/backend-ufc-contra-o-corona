module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('production_data', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      location_id: {
        type: Sequelize.INTEGER,
        references: { model: 'distribuition_locations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      production_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      distribuition_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      production_id: {
        type: Sequelize.INTEGER,
        references: { model: 'productions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('production_data');
  },
};
