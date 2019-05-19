var sails = require('sails');
var chai = require('chai');

global.expect = chai.expect;

// Before running any tests...
before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  sails.lift({
    fixtures: true,
    log: { level: 'error' },
    models: {
      connection: 'test',
      migrate: 'drop'
    }

  }, function(err) {
    if (err) { return done(err); }

    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)

    return done();
  });
});

// After all tests have finished...
after(function(done) {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);

});
