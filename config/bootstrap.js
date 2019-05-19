const faker = require('faker');
const randomId = (items) => items[Math.floor(Math.random() * items.length)].id;

/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function (done) {

  if (process.env.NODE_ENV === 'production' || sails.config.models.migrate === 'safe') {
    sails.log.warn('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "' + sails.config.environment + '" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
    return done();
  }

  if (sails.config.fixtures) {
    await sails.models.user.createEach([
      { name: 'admin', isAdmin: true, password: await sails.helpers.passwords.hashPassword('admin') },
    ]).fetch();

    const fakeMovies = [];

    for (let i = 0; i < 100; i++) {
      fakeMovies.push({
        year: faker.date.past(),
        publisher: faker.name.findName(),
        title: faker.random.word(),
        synopsis: faker.lorem.text(),
        duration: faker.random.number(200),
        poster: faker.image.imageUrl(),
        rating: Math.floor(Math.random() * 10) + 1,
        country: faker.address.country()
      });
    }

    const movies = await sails.models.movie.createEach(fakeMovies).fetch();

    const fakeArtists = [];

    for (let i = 0; i < 100; i++) {
      fakeArtists.push({
        fullName: faker.name.findName(),
        birthDate: faker.date.past(),
        nationality: faker.address.country(),
        photo: faker.image.imageUrl(),
        gender: i % 2 ? 'F' : 'M'
      });
    }

    const artists = await sails.models.artist.createEach(fakeArtists).fetch();

    // create associations
    for (let index = 0; index < artists.length; index++) {
      // add random movies to artists
      if (Boolean(index % 2)) {
        await sails.models.artist.update({ id: artists[index].id }).set({ starredIn: [randomId(movies), randomId(movies)] });
      } else {
        await sails.models.artist.update({ id: artists[index].id }).set({ directed: [randomId(movies), randomId(movies)] });
      }
    }
  }


  return done();

};
