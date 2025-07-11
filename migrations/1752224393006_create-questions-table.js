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
  pgm.createTable('questions', {
    quizzes_id: {
      type: 'varchar(50)',
      notNull: true,
      references: 'quizzes(id)',
      onDelete: 'CASCADE',
    },
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    question_text: {
      type: 'text',
      notNull: true,
    },
    question_type: {
      type: 'text',
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
  pgm.createIndex('questions', 'quizzes_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
  pgm.dropTable('questions');
};

module.exports = { up, down };