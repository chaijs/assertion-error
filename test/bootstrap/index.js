/*!
 * Attach chai to global should
 */

global.chai = require('chai');
global.should = global.chai.should();

/*!
 * Chai Plugins
 */

//global.chai.use(require('chai-spies'));
//global.chai.use(require('chai-http'));

/*!
 * Import project
 */

global.assertion-error = require('../..');

/*!
 * Helper to load internals for cov unit tests
 */

function req (name) {
  return process.env.assertion-error_COV
    ? require('../../lib-cov/assertion-error/' + name)
    : require('../../lib/assertion-error/' + name);
}

/*!
 * Load unexposed modules for unit tests
 */

global.__assertion-error = {};
