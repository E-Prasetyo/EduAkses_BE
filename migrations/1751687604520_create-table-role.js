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
    pgm.createTable('roles', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true
        },
        name: {
            type: 'TEXT',
            notNull: true
        },
        created_at: {
            type: 'TIMESTAMP',
            notNull: true
        }
    });

    pgm.sql(`
    INSERT INTO roles (id, name, created_at) VALUES
        ('roles-hHojf464QC0r1sH8', 'admin', CURRENT_TIMESTAMP),
        ('roles-yPswyBdxAgcMLzZD', 'user', CURRENT_TIMESTAMP),
        ('roles-Le54FgTGwBVlz_9x', 'lecture', CURRENT_TIMESTAMP)
    `);

    pgm.renameColumn('users', 'role', 'role_id');

     // Foreign key dari songs ke album
     pgm.addConstraint('users', 'fk_users.users_id_roles.id', {
        foreignKeys: {
            columns: 'role_id',
            references: 'roles(id)',
            onDelete: 'CASCADE', 
            onUpdate: 'CASCADE',
        },
     });
    
    
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
const down = (pgm) => {
    pgm.dropTable('roles');
};

module.exports = { up, down };
