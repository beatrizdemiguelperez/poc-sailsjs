var request = require('supertest');

describe('UserController.login', function() {

  describe('#login()', function() {
    it('should return ok if credentials are correct', function (done) {
      var login = { name: "admin", password: "admin" };
      request(sails.hooks.http.app)
          .post('/user/login')
          .send(login)
          .expect(200, done);
    });
    it('should return ko if credentials are incorrect', function (done) {
      var login = { name: "admin", password: "bar" };
      request(sails.hooks.http.app)
          .post('/user/login')
          .send(login)
          .expect(401, done);
    });
    it('should return 401 if user does not exists', function (done) {
      var login = { name: "foo", password: "bar" };
      request(sails.hooks.http.app)
          .post('/user/login')
          .send(login)
          .expect(401, done);
    });
    it('should return 400 if input params are wrong', function (done) {
      var login = { foo: "foo", bar: "bar" };
      request(sails.hooks.http.app)
          .post('/user/login')
          .send(login)
          .expect(400, done);
    });
    it('should return session userId', function (done) {
      var login = { name: "admin", password: "admin" };
      request(sails.hooks.http.app)
          .post('/user/login')
          .send(login)
          .expect(200)
          .end(function (err, res) {
            if (err) {
              throw err;
            }
            var cookies = res.headers['set-cookie'];
            expect(Boolean(cookies['sails.sid']));
            done();
        });
    });
  });

});
