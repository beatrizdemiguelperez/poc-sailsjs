module.exports = {


  friendlyName: 'Signup',


  description: 'Sign up for a new user account.',

  inputs: {
    name: {
      description: 'Username',
      type: 'string',
      required: true
    },

    password: {
      description: 'Unencrypted password',
      type: 'string',
      required: true
    }

  },


  exits: {

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or name address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
      'parameters should have been validated/coerced _before_ they were sent.'
    },

    name: {
      statusCode: 409,
      description: 'The provided name is already in use.',
    },

  },


  fn: async function (inputs, exits) {

    const newName = inputs.name.toLowerCase();

    // Build up data for the new user record and save it to the database.
    // (Also use `fetch` to retrieve the new ID so that we can use it below.)
    try {
      const newUserRecord = await User.create({
        name: newName,
        isAdmin: inputs.isAdmin,
        password: await sails.helpers.passwords.hashPassword(inputs.password)
      })
      .intercept('E_UNIQUE', 'nameAlreadyInUse')
      .intercept({ name: 'UsageError'}, 'invalid')
      .fetch();

      sails.log.info('User created successfully');

      // Store the user's new id in their session.
      this.req.session.userId = newUserRecord.id;

      // Since everything went ok, send our 200 response.
      return exits.success();
    } catch(e) {
      sails.log.info({e});
    }

  }

};
