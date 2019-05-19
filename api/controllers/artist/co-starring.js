module.exports = {


  friendlyName: 'Co starring',


  description: 'Sub obtimal implementation of a co-starring filter. Given an artist id, this actions returns every other artist that starred with him on a movie',


  inputs: {
    artistId: {
      description: '',
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      responseType: '',
    },
    notFound: {
      description: 'No artist with the specified ID was found in the database.',
      responseType: 'notFound'
    }
 },



  fn: async function (inputs, exits) {

    // Find input artist. If found, populate movies to have the id, see https://sailsjs.com/documentation/concepts/models-and-orm/records#?expected-types-values-for-association-attributes
    const artist = await Artist.findOne({ id: inputs.artistId }).populate('starredIn');;

    // Check input artist exists, exit otherwise
    if (!artist) {
      return exits.notFound();
    }

    // Keep starred movies ids
    const moviesIds = artist.starredIn.map(({ id }) => id);

    // Populate these movies' casts, excluding input artist id
    const moviestArtistStarredIn = await Movie.find(moviesIds).populate('cast', { id: { '!=': inputs.artistId }});

    // Reduce to a single array
    const coStars = moviestArtistStarredIn.reduce((acc, movie) => {
      acc.push(...movie.cast);

      return acc;
    }, []);

    return exits.success(coStars);

  }


};
