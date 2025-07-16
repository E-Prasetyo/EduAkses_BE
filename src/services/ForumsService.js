const { Pool } = require("pg");

class ForumsService {
  constructor() {
    this._pool = new Pool();
  }

  async getForumById(id) {
    const result = await this._pool.query(
      "SELECT * FROM forums WHERE id = $1",
      [id]
    );
    if (!result.rows.length) {
      throw new Error("Forum not found");
    }
    return result.rows[0];
  }

  async getCommentsByForumId(forumId) {
    const result = await this._pool.query(
      "SELECT * FROM forum_comments WHERE forum_id = $1 ORDER BY created_at ASC",
      [forumId]
    );
    return result.rows;
  }

  async addComment(forumId, { author, content }) {
    const result = await this._pool.query(
      "INSERT INTO forum_comments (forum_id, author, content) VALUES ($1, $2, $3) RETURNING id",
      [forumId, author, content]
    );
    return result.rows[0].id;
  }
}

module.exports = ForumsService;
