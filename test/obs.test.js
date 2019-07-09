'use strict';

const mock = require('egg-mock');

describe('test/obs.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/obs-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, obs')
      .expect(200);
  });
});
