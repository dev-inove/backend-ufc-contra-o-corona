module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('needs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subtitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      situation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
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
      started: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ended: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
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
    return queryInterface.dropTable('needs');
  },
};
