/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
//export const shorthands = undefined;


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const up = (pgm) => {
  pgm.createTable('quizzes', {
    content_id: {
      type: 'varchar(50)',
      notNull: true,
      references: 'content(id)',
      onDelete: 'CASCADE',
    },
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    title: {
      type: 'text',
      notNull: true,
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  // Create index
  pgm.createIndex('quizzes', 'content_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
  pgm.dropTable('quizzes');
};

module.exports = { up, down };