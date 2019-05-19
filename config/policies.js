/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': false,

  'user/*': 'is-admin',

  'user/login': true,
  'user/signup': true,

  'user/logout': 'is-logged-in',

  'artist/*': 'is-logged-in',
  'movie/*': 'is-logged-in',

  'artist/destroy': 'is-admin',
  'movie/destroy': 'is-admin',

  'artist/find': true,
  'artist/findOne': true,
  'movie/find': true,
  'movie/findOne': true,
  'artist/co-starring': true
};
