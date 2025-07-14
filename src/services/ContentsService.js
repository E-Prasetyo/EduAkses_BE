const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../exceptions/NotFoundError');
const AuthorizationError = require('../exceptions/AuthenticationError');

class ContentsService {
    constructor(usersService) {
        this._pool = new Pool();
        this._usersService = usersService;
    }

    async postContents(dataPayload, credentialId, fileLocation) {
        const id = `ctn-${nanoid(16)}`;
        const durationInt = parseInt(dataPayload.duration, 10);
        const dateNow = new Date().toISOString();

        const query = {
            text: ` INSERT INTO contents (
                        id, image_thumbnail, title, duration, learn_count, status,
                        approval_date, approval_by, created_at, updated_at, video,
                        description, level, user_id, category_id
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6,
                        $7, $8, $9, $10, $11,
                        $12, $13, $14, $15
                    )
                    RETURNING id    
                    `,
            values: [
                id,
                fileLocation,
                dataPayload.title,
                durationInt,
                0,
                "DRAFT",
                null,
                null,
                dateNow,
                dateNow,
                dataPayload.video,
                dataPayload.description,
                dataPayload.level,
                credentialId,
                dataPayload.categories
            ]
        };

        const result = await this._pool.query(query);

        return result.rows[0].id;
    }

    async putContents(idContent,dataPayload, fileLocation) {
        const durationInt = parseInt(dataPayload.duration, 10);
        const dateNow = new Date().toISOString();

        const query = {
            text: ` UPDATE contents SET
                        image_thumbnail=$1, title=$2, duration=$3,
                        updated_at=$4, video=$5, description=$6,
                        level=$7, category_id=$8
                    WHERE id = $9
                    `,
            values: [
                fileLocation,
                dataPayload.title,
                durationInt,
                dateNow,
                dataPayload.video,
                dataPayload.description,
                dataPayload.level,
                dataPayload.categories,
                idContent
            ]
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Content tidak ditemukan');
        }
    }

    async getAllContents() {
        const query = {
            text: `select 
                        c.id,
                        c.image_thumbnail as imageThumbnail,
                        c.title,
                        c.duration,
                        c.learn_count as learnCount,
                        c.status,
                        c.video,
                        c.description,
                        c.level,
                        s.fullname,
                        cg.title
                    from contents c
                    left join users s on s.id = c.user_id
                    left join categories cg on cg.id = c.category_id ;`
        }

        const result = await this._pool.query(query);

        return result.rows;
    }

    async getContentsById(idContent) {
        const query = {
            text: `select 
                        c.id,
                        c.image_thumbnail as imageThumbnail,
                        c.title,
                        c.duration,
                        c.learn_count as learnCount,
                        c.status,
                        c.video,
                        c.description,
                        c.level,
                        s.fullname,
                        cg.title
                    from contents c
                    left join users s on s.id = c.user_id
                    left join categories cg on cg.id = c.category_id
                    WHERE c.id = $1`,
            values: [ idContent ]
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Content tidak ditemukan');
        }

        return result.rows[0];
    }

    async postContentsMaterial(idContent, title, description) {
        const id = `mt-${nanoid(16)}`;
        const dateNow = new Date().toISOString();

        const query = {
            text: "INSERT INTO materials (id,content_id,title,updated_at,material_text,created_at) VALUES($1,$2,$3,$4,$5,$6) RETURNING id",
            values: [ id, idContent, title, dateNow, description, dateNow ]
        }

        const result = await this._pool.query(query);

        return result.rows[0].id;
    }

    async getContentsByIdContentMaterials(idContent) {
        const query = {
            text: "SELECT * FROM materials WHERE content_id = $1",
            values: [ idContent ]
        }

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Content tidak ditemukan');
        }

        return result.rows;
    }

    async getContentsByIdMaterials(idContent) {
        
        const result = await this.getContentsById(idContent);

        const materials = await this.getContentsByIdContentMaterials(idContent);

        result.materials = materials;

        return result;
    }

    async verifyContentOwner(id, owner) {
        const query = {
            text: `SELECT c.*, s.role_id FROM contents c
                    LEFT JOIN users s ON s.id = c.user_id
                    WHERE c.id = $1`,
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Content tidak ditemukan');
        }
        
        const content = result.rows[0];

        const adminByPass = await this._usersService.getUserById(owner);

        if (content.user_id !== owner && adminByPass.role !== 'admin') {
            throw new AuthorizationError('Anda tidak berhak mengakses resource ini');
        }
    }

}

module.exports = ContentsService;