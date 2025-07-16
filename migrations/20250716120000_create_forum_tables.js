exports.shorthands = undefined;

exports.up = (pgm) => {
  // threads table
  pgm.createTable("threads", {
    id: {
      type: "UUID",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    title: { type: "VARCHAR(255)", notNull: true },
    body: { type: "TEXT", notNull: true },
    author_id: {
      type: "UUID",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  // comments table
  pgm.createTable("comments", {
    id: {
      type: "UUID",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    thread_id: {
      type: "UUID",
      notNull: true,
      references: "threads",
      onDelete: "CASCADE",
    },
    body: { type: "TEXT", notNull: true },
    author_id: {
      type: "UUID",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
    parent_id: { type: "UUID" },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint("comments", "fk_comments_parent", {
    foreignKeys: {
      columns: "parent_id",
      references: "comments(id)",
      onDelete: "CASCADE",
    },
  });

  // comment_likes table
  pgm.createTable("comment_likes", {
    id: {
      type: "UUID",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    comment_id: {
      type: "UUID",
      notNull: true,
      references: "comments",
      onDelete: "CASCADE",
    },
    user_id: {
      type: "UUID",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint("comment_likes", "unique_user_comment_like", {
    unique: ["comment_id", "user_id"],
  });
};

exports.down = (pgm) => {
  pgm.dropTable("comment_likes");
  pgm.dropTable("comments");
  pgm.dropTable("threads");
};
