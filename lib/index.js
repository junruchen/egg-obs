const ObsClient = require('esdk-obs-nodejs');
const assert = require('assert');

class EggObsClient {
    constructor(config) {
        assert(config, 'egg-obs config is null')
        assert(config.access_key_id, 'egg-obs config access_key_id is null')
        assert(config.secret_access_key, 'egg-obs config secret_access_key is null')
        assert(config.server, 'egg-obs config server is null')
        this.config = config
        this.setBucket(config.bucket)
        // 创建ObsClient实例
        this.obsClient = new ObsClient(config);
    }

    setBucket(name) {
        assert(name, 'egg-obs bucket is null')
        this.bucket = name
    }

    getObject({ key, imageProcess }) {
        return new Promise((resolve, reject) => {
            this.obsClient.getObject({
                Bucket: this.bucket,
                Key: key,
                ImageProcess: imageProcess,
            }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        })
    }

    delObject({ key }) {
        return new Promise((resolve, reject) => {
            this.obsClient.deleteObject({
                Bucket: this.bucket,
                Key: key
            }, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            });
        })
    }

    putObject({ key, body }) {
        return new Promise((resolve, reject) => {
            this.obsClient.putObject({
                Bucket: this.bucket,
                Key: key,
                Body: body
            }, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = EggObsClient;
