/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
//const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const up = (pgm) => {
  pgm.createTable('options', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    question_id: {
      type: 'varchar(50)',
      notNull: true,
      references: 'questions(id)',
      onDelete: 'CASCADE',
    },
    option_text: {
      type: 'text',
      notNull: true,
    },
    is_correct: {
      type: 'boolean',
      default: false,
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
  pgm.createIndex('options', 'question_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
  pgm.dropTable('options');
};

module.exports = { up, down };