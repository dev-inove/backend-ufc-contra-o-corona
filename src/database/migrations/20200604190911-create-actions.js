module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('actions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      subtitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.BLOB,
        allowNull: false,
      },
      impact: {
        type: Sequelize.STRING,
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
      target_audience: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      observation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      situation: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('actions');
  },
};
