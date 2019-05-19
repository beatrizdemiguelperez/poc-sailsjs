module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {

  },


  exits: {
    success: {
      responseType: ''
    },
  },


  fn: async function (inputs, exits) {

    delete this.req.session.userId;
    delete this.req.me;

    return exits.success();
  }


};
