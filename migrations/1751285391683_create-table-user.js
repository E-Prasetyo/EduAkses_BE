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
    pgm.createTable('users', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        fullname: {
            type: 'TEXT',
            notNull: true,
        },
        email: {
            type: 'TEXT',
            notNull: true,
            unique: true
        },
        password: {
            type: 'TEXT',
            notNull: true,
        },
        role: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        created_at: {
            type: 'TIMESTAMP',
            notNull: true,
        },
        updated_at: {
            type: 'TIMESTAMP',
            notNull: true,
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
    pgm.dropTable('users');
};

module.exports = { up, down };
