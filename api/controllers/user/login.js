module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


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
    },
  },

  exits: {

    success: {
      responseType: ''
    },

    badRequest: {
      description: '',
      responseType: 'badRequest'
    },

    badCombo: {
      description: `The provided email and password combination does not
      match any user in the database.`,
      responseType: 'unauthorized'
    }

  },


  fn: async function (inputs, exits) {

    var userRecord = await User.findOne({
      name: inputs.name.toLowerCase(),
    });

    if(!userRecord) {
      throw 'badCombo';
    }

    try {
      await sails.helpers.passwords.checkPassword(inputs.password, userRecord.password)
      .intercept('incorrect', 'badCombo');

      // Modify the active session instance.
      this.req.session.userId = userRecord.id;

      // Send success response (this is where the session actually gets persisted)
      return exits.success();

    } catch(e) {
      throw 'badCombo';
    }

  }


};
