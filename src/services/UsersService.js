const { Pool } = require('pg');
const InvariantError = require('../exceptions/InvariantError');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const NotFoundError = require('../exceptions/NotFoundError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const { values } = require('prelude-ls');
 
class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addRegister({ email, password, fullname, role }) {
    await this.verifyNewEmail(email);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createAt = new Date().toISOString();
 
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, fullname, email, hashedPassword, role, createAt, createAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.rows[0].id;
  }
  
  async verifyNewEmail(username) {
      const query = {
        text: 'SELECT email FROM users WHERE email = $1',
        values: [username],
      };
    
      const result = await this._pool.query(query);
    
      if (result.rows.length > 0) {
        throw new InvariantError('Register gagal. Email sudah terdaftar.');
      }
  }

  async getUserById(userId) {

    const query = {
      text: `SELECT u.id, u.email, u.fullname, r.name as role FROM users u
              JOIN roles r ON r.id = u.role_id WHERE u.id = $1`,
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result.rows[0];
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: `SELECT u.id, r.name as role, password FROM users u
              JOIN roles r ON r.id = u.role_id  WHERE u.email = $1`,
      values: [username]
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, role, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return { id, role }
  }

  async getUsersByUsername(username) {
      const query = {
        text: 'SELECT id, email, fullname FROM users WHERE UPPER(fullname) LIKE UPPER($1)',
        values: [`%${username}%`],
      };
      const result = await this._pool.query(query);
      return result.rows;
  }

  async putDataUsers({ idUser, email, password, fullname }) {

    const query = {
      text: `UPDATE users SET
              email=$1,
              password=$2,
              fullname=$3
            WHERE id = $4`,
      values: [ email, password, fullname, idUser]
    }

    const result = await this._pool.query(query);
    
    if (!result.rowCount) {
      throw new NotFoundError('Users tidak ditemukan');
    }
  }

  async putDataUsersAdmin({ idUser, email, password, fullname, role }) {

    const query = {
      text: `UPDATE users SET
              email=$1,
              password=$2,
              fullname=$3,
              role_id = $4
            WHERE id = $5`,
      values: [ email, password, fullname, role, idUser]
    }

    const result = await this._pool.query(query);
    
    if (!result.rowCount) {
      throw new NotFoundError('Users tidak ditemukan');
    }
  }

}

module.exports = UsersService;