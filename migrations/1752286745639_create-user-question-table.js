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
  pgm.createTable('user_questions', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'varchar(50)',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    question_id: {
      type: 'varchar(50)',
      notNull: true,
      references: 'questions(id)',
      onDelete: 'CASCADE',
    },
    selected_option_id: {
      type: 'varchar(50)',
      references: 'options(id)',
      onDelete: 'SET NULL',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });

  // Create indexes
  pgm.createIndex('user_questions', 'user_id');
  pgm.createIndex('user_questions', 'question_id');
  pgm.createIndex('user_questions', 'selected_option_id');
  
  // Create unique constraint to prevent duplicate answers
  pgm.createIndex('user_questions', ['user_id', 'question_id'], { unique: true });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
  pgm.dropTable('user_questions');
};

module.exports = { up, down };
