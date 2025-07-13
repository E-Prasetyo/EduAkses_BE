const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class ContentsService {
    constructor() {
        this._pool = new Pool();
    }

    async postContents(dataPayload, credentialId, fileLocation) {
        const id = `ctn-${nanoid(16)}`;
        const durationInt = parseInt(dataPayload.duration, 10);
        const dateNow = new Date().toISOString();

        const query = {
            text: ` INSERT INTO contents (
                        id, image_thumbnail, title, duration, learn_count, status,
                        approval_date, approval_by, created_at, updated_at, video,
                        description, level, user_id, material, category_id
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6,
                        $7, $8, $9, $10, $11,
                        $12, $13, $14, $15, $16
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
                dataPayload.material,
                dataPayload.categories
            ]
        };

        const result = await this._pool.query(query);

        return result.rows[0].id;
    }

    async getAllContents() {
        const query = {
            text: "SELECT * FROM contents"
        }

        const result = await this._pool.query(query);

        return result.rows;
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
}

module.exports = ContentsService;