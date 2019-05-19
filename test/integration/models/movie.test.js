describe('Movies', function() {
  it ('should return 100', function(done) {
    sails.models.movie.find().exec(function(err, movies) {
      if (err) {
        throw err;
      }
      expect(movies.length).to.equal(100);
      done();
    });
  });
});
