const { Storage } = require('@google-cloud/storage');
const config = require('../../config/config');
 
class StorageService {
  constructor() {
    this._storage = new Storage({
      keyFilename: config.gcp.googleApplicationCredentials,
      projectId: config.gcp.projectId,
    });

    this._bucket = this._storage.bucket(config.gcp.gcsBucket);
  }
 
 async writeFile(file, meta) {
    const gcsFile = this._bucket.file(meta.filename);

    return new Promise((resolve, reject) => {
      const writeStream = gcsFile.createWriteStream({
        resumable: false,
        gzip: true,
        metadata: {
          contentType: meta.headers['content-type'],
        },
      });

      file.pipe(writeStream)
        .on('finish', async () => {
          try {
            const url = await this.createPreSignedUrl(meta.filename);
            resolve({ success: true, filename: meta.filename, url });
          } catch (err) {
            reject(new Error('GCS URL error: ' + err.message));
          }
        })
        .on('error', (err) => {
          reject(new Error('Upload failed: ' + err.message));
        });
    });
  }
 
  async createPreSignedUrl(filename) {
   const [url] = await this._bucket.file(filename).getSignedUrl({
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60, // 1 hour
    });

    return url;
  }
}
 
module.exports = StorageService;