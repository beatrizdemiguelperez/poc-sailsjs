var request = require('supertest');

describe('Users', function() {

  describe('#get()', function() {
    it('should return forbidden if it is not logged in', function (done) {
      request(sails.hooks.http.app)
        .get('/user')
        .expect(403, done);
    });
  });

});
