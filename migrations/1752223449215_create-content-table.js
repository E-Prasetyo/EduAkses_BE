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
  pgm.createTable('content', {
    kategori_id: {
      type: 'varchar(50)',
      notNull: true,
      references: 'kategori(id)',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: 'varchar(50)',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    id: {
      type: 'varchar(50)',
      primaryKey: true,
    },
    content_detail_id: {
      type: 'varchar(50)',
    },
    image_title: {
      type: 'text',
    },
    title: {
      type: 'text',
      notNull: true,
    },
    duration: {
      type: 'text',
    },
    learn: {
      type: 'integer',
    },
    status: {
      type: 'varchar(50)',
    },
    approval_date: {
      type: 'timestamp',
    },
    approval_by: {
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
    materi: {
      type: 'text',
    },
    video: {
      type: 'text',
    },
    description: {
      type: 'text',
    },
    level: {
      type: 'text',
    },
  });

  // Create indexes
  pgm.createIndex('content', 'kategori_id');
  pgm.createIndex('content', 'user_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
  pgm.dropTable('content');
};

module.exports = { up, down };
