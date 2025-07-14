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
    pgm.createTable('quizzes', {
        id: {
            type: 'varchar(50)',
            primaryKey: true,
        },
        content_id: {
            type: 'varchar(50)',
            notNull: true,
        },
        title: {
            type: 'text',
            notNull: true,
        },
        description: {
            type: 'text',
            notNull: false,
        },
        time_limit: {
            type: 'integer',
            notNull: false,
        },
        passing_score: {
            type: 'integer',
            notNull: false,
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: false,
        },
    });

    pgm.createTable('questions', {
        id: {
            type: 'varchar(50)',
            primaryKey: true,
        },
        quizzes_id: {
            type: 'varchar(50)',
            notNull: true,
        },
        question_text: {
            type: 'text',
            notNull: true,
        },
        question_type: {
            type: 'text',
            notNull: true,
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: false,
        },
    });

    pgm.createTable('options', {
        id: {
            type: 'varchar(50)',
            primaryKey: true,
        },
        question_id: {
            type: 'varchar(50)',
            notNull: true,
        },
        option_text: {
            type: 'text',
            notNull: true,
        },
        is_correct: {
            type: 'boolean',
            notNull: true,
            default: false,
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: false,
        },
    });

    // foreign key: quizzes → contents
    pgm.addConstraint('quizzes', 'fk_quizzes_content_id', {
        foreignKeys: {
            columns: 'content_id',
            references: 'contents(id)',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    })

    // foreign key: questions → quizzes
    pgm.addConstraint('questions', 'fk_questions_quizzes_id', {
        foreignKeys: {
            columns: 'quizzes_id',
            references: 'quizzes(id)',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    })

    // foreign key: quizzes → options
    pgm.addConstraint('options', 'fk_options_questions_id', {
        foreignKeys: {
            columns: 'question_id',
            references: 'questions(id)',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('options');
    pgm.dropTable('questions');
    pgm.dropTable('quizzes');
};
