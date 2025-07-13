const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../exceptions/NotFoundError');

class CategoriesService {
    constructor() {
        this._pool = new Pool
    }

    async postCategories(title) {
        const id = `cat-${nanoid(16)}`;
        const createdAt = new Date().toISOString();

        const query = {
            text: "INSERT INTO categories VALUES($1,$2,$3,$4) RETURNING id",
            values: [id, title, createdAt, createdAt]
        }

        const result = await this._pool.query(query);

        return result.rows[0].id
    }

    async getAllCategories() {
        const query = {
            text: "SELECT c.id, c.title FROM categories c"
        }

        const result = await this._pool.query(query);

        return result.rows
    }

    async putCategories(title, idTitle) {
        const updatedAt = new Date().toISOString();

        const query = {
            text: "UPDATE categories SET title=$1, updated_at=$2 WHERE id = $3",
            values: [title, updatedAt, idTitle]
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Categories tidak ditemukan');
        }
    }
}

module.exports = CategoriesService;