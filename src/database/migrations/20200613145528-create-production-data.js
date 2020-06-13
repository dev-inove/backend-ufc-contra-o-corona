module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('production_data', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      data: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      production_id: {
        type: Sequelize.INTEGER,
        references: { model: 'productions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
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
