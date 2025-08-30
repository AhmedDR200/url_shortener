'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create url table first (referenced by hit)
    await queryInterface.createTable('url', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      shortCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      longUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create allowlist table
    await queryInterface.createTable('allowlist', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Create hit table (references url)
    await queryInterface.createTable('hit', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      urlId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'url',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      ipAddress: {
        type: Sequelize.STRING(45), // ipv6 safe
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    // Add index on hit.createdAt (matches @Index + @CreatedAt usage in model)
    await queryInterface.addIndex('hit', ['createdAt'], {
      name: 'hit_createdAt_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop in reverse order to avoid FK errors
    await queryInterface.removeIndex('hit', 'hit_createdAt_idx').catch(() => { });
    await queryInterface.dropTable('hit');
    await queryInterface.dropTable('allowlist');
    await queryInterface.dropTable('url');
  }
};
