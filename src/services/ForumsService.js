"use strict";

const { Pool } = require("pg");
const NotFoundError = require("../exceptions/NotFoundError");

class ForumsService {
  constructor() {
    this._pool = new Pool();
  }

  async getThreads({ page, limit }) {
    const offset = (page - 1) * limit;
    const query = {
      text: `
        SELECT t.id, t.title, t.created_at, u.username AS author, COUNT(c.id) AS comment_count
        FROM threads t
        JOIN users u ON t.author_id = u.id
        LEFT JOIN comments c ON c.thread_id = t.id
        GROUP BY t.id, u.username
        ORDER BY t.created_at DESC
        LIMIT $1 OFFSET $2`,
      values: [limit, offset],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getThreadById(id) {
    const threadQuery = {
      text: `
        SELECT t.id, t.title, t.body, t.created_at, u.username AS author
        FROM threads t
        JOIN users u ON t.author_id = u.id
        WHERE t.id = $1`,
      values: [id],
    };

    const threadResult = await this._pool.query(threadQuery);
    const thread = threadResult.rows[0];

    if (!thread) {
      throw new NotFoundError("Thread tidak ditemukan");
    }

    const commentsQuery = {
      text: `
        SELECT c.id, c.body, c.parent_id, c.created_at, u.username AS author,
               COUNT(cl.id) AS like_count
        FROM comments c
        JOIN users u ON c.author_id = u.id
        LEFT JOIN comment_likes cl ON cl.comment_id = c.id
        WHERE c.thread_id = $1
        GROUP BY c.id, u.username
        ORDER BY c.created_at ASC`,
      values: [id],
    };

    const commentsResult = await this._pool.query(commentsQuery);

    const map = {};
    commentsResult.rows.forEach((r) => {
      map[r.id] = { ...r, replies: [] };
    });

    const roots = [];
    commentsResult.rows.forEach((r) => {
      if (r.parent_id && map[r.parent_id]) {
        map[r.parent_id].replies.push(map[r.id]);
      } else {
        roots.push(map[r.id]);
      }
    });

    thread.comments = roots;
    return thread;
  }

  async createThread({ title, body, authorId }) {
    const query = {
      text: `
        INSERT INTO threads (title, body, author_id)
        VALUES ($1, $2, $3)
        RETURNING id`,
      values: [title, body, authorId],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async createComment({ threadId, body, parentId, authorId }) {
    const query = {
      text: `
        INSERT INTO comments (thread_id, body, parent_id, author_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id`,
      values: [threadId, body, parentId || null, authorId],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async likeComment({ commentId, userId }) {
    const query = {
      text: `
        INSERT INTO comment_likes (comment_id, user_id)
        VALUES ($1, $2)
        ON CONFLICT (comment_id, user_id) DO NOTHING`,
      values: [commentId, userId],
    };

    await this._pool.query(query);
  }

  async unlikeComment({ commentId, userId }) {
    const query = {
      text: `
        DELETE FROM comment_likes
        WHERE comment_id = $1 AND user_id = $2`,
      values: [commentId, userId],
    };

    await this._pool.query(query);
  }
}

module.exports = ForumsService;
