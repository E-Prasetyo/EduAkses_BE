const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class RolesService {
    constructor() {
        this._pool = new Pool();
    }

    async postRoles( name ) {
        const idRole = `role-${nanoid(16)}`;
        const createAt = new Date().toISOString();

        const query = {
            text: "INSERT INTO roles VALUES($1,$2,$3) RETURNING id",
            values: [ idRole, name, createAt ]
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('User gagal ditambahkan');
          }
        
        return result.rows[0].id;
    }

    async getAllRoles() {
        const query = {
            text : 'SELECT id, name FROM roles ;'
        }

        const result = await this._pool.query(query);

        return result.rows;
    }


    async putRoles(name, roleId) {
        const query = {
            text: 'UPDATE roles SET name=$1 WHERE id = $2',
            values: [name, roleId]
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Role tidak ditemukan');
        }
      
    }
}

module.exports = RolesService;