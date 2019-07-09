# egg-obs

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-obs.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-obs
[travis-image]: https://img.shields.io/travis/eggjs/egg-obs.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-obs
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-obs.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-obs?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-obs.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-obs
[snyk-image]: https://snyk.io/test/npm/egg-obs/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-obs
[download-image]: https://img.shields.io/npm/dm/egg-obs.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-obs
[OBS](https://support.huaweicloud.com/obs/index.html) plugin for egg

## Install

```bash
$ npm i egg-obs --save
```

## Configuration

```js
// config/plugin.js
exports.obs = {
  enable: true,
  package: 'egg-obs',
};
```

```js
// config/config.default.js
exports.obs = {
  access_key_id: '',
  secret_access_key: '',
  server: '',
  bucket: ''
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Usage

- putObject({ key, imageProcess })
- getObject({ key, body })
- delObject({ key })
- setBucket(name)

You can require obs instance on app or ctx.

```js
const path = require('path');
const Controller = require('egg').Controller;

module.exports = class extends Controller {
  // upload file
  async upload() {
    const { ctx } = this
    const stream = await ctx.getFileStream()
    const filename = Math.floor(Math.random() * 10000) + path.extname(stream.filename)
    
    try {
      await ctx.obs.putObject({
        key: filename,
        body: stream
      });
      ctx.body = `/obs-image/${filename}`
    } catch (error) {
      ctx.body = error;
      ctx.logger.error(new Error(error));
    }
  }

  // get file
  async getImage() {
    const { ctx } = this
    const objectname = ctx.params.objectname;
    try {
      const result = await ctx.obs.getObject({ key: objectname })
      if (result.CommonMsg.Status < 300 && result.InterfaceResult) {
        // 读取对象内容
        const { ContentLength, Date, ETag, ContentType, Content } = result.InterfaceResult
        ctx.status = 200
        ctx.type = ContentType
        ctx.etag = ETag
        ctx.length = ContentLength
        ctx.set('Date', Date)
        ctx.body = Content
      } else {
        ctx.body = result.CommonMsg.Message
      }
    } catch (error) {
      ctx.body = error
      ctx.logger.error(new Error(error));
    }
  }
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
