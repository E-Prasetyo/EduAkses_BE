/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('contents', {
        id: {
            type: 'varchar(50)',
            primaryKey: true
        },
        image_thumbnail: {
            type: 'text',
            notNull: false
        },
        title: {
            type: 'text',
            notNull: true
        },
        duration: {
            type: 'integer',
            notNull: true
        },
        learn_count: {
            type: 'integer',
            notNull: false
        },
        status: {
            type: 'varchar(50)',
            notNull: true,
            default: 'DRAFT'
        },
        approval_date: {
            type: 'timestamp',
            notNull: false
        },
        approval_by: {
            type: 'text',
            notNull: false
        },
        created_at: {
            type: 'timestamp',
            notNull: true
        },
        updated_at: {
            type: 'timestamp',
            notNull: false
        },
        video: {
            type: 'text',
            notNull: false
        },
        description: {
            type: 'text',
            notNull: true
        },
        level: {
            type: "text",
            notNull: false
        },
        user_id: {
            type: 'varchar(50)',
            notNull: true
        },
        category_id: {
            type: 'varchar(50)',
            notNull: true,
        }
    });

    pgm.createTable('categories', {
        id: {
            type: 'varchar(50)',
            primaryKey: true
        },
        title: {
            type: 'text',
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true
        },
        updated_at: {
            type: 'timestamp',
            notNull: false
        },
    })

    pgm.createTable('materials', {
        id: {
            type: 'varchar(50)',
            primaryKey: true
        },
        content_id: {
            type: 'varchar(50)',
            primaryKey: true
        },
        title: {
            type: 'text',
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true
        },
        updated_at: {
            type: 'timestamp',
            notNull: true
        },
        material_text: {
            type: 'text',
            notNull: true
        }
    })

    // foreign key: contents → users
    pgm.addConstraint('contents', 'fk_contents_user_id', {
        foreignKeys: {
            columns: 'user_id',
            references: 'users(id)',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    })

    // foreign key: materials → contents
    pgm.addConstraint('materials', 'fk_material_contents_id', {
        foreignKeys: {
            columns: 'content_id',
            references: 'contents(id)',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    })

    // foreign key: contents → categories
    pgm.addConstraint('contents', 'fk_contents_category_id', {
        foreignKeys: {
            columns: 'category_id',
            references: 'categories(id)',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    })

    pgm.sql(`
        INSERT INTO categories (id, title, created_at, updated_at) VALUES
        ('cat-5TBsxJwBhp6E7ilg', 'Pemrograman Dasar', CURRENT_TIMESTAMP, NULL),
        ('cat-yDXh-Y5CTQpb01tt', 'Desain UI/UX', CURRENT_TIMESTAMP, NULL),
        ('cat-yDXhZJwBhp6E7ilg', 'Manajemen Proyek', CURRENT_TIMESTAMP, NULL);
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropConstraint('contents', 'fk_contents_user_id');
    pgm.dropConstraint('contents', 'fk_contents_material_id');
    pgm.dropConstraint('contents', 'fk_contents_category_id');

    pgm.dropTable('contents');
    pgm.dropTable('materials');
    pgm.dropTable('categories');
};
