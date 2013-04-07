/*!
 * Simple test runner.
 */

var count = 0
  , failures = []
  , tests = [];

global.runner = function (fn) {
  fn();

  console.log('');
  console.log('  Tests (%d)', tests.length);

  tests.forEach(function (test) {
    var err = false
      , num = ++count;

    try { test.fn(); }
    catch (ex) { err = ex; }

    if (err) {
      console.log('  %d. [fail] %s', num, test.name);
      failures.push({ num: num, err: err });
    } else {
      console.log('  %d. [pass] %s', num, test.name);
    }
  });

  console.log('');
  console.log('  Failures (%d)', failures.length);

  failures.forEach(function (failure) {
    console.log('  %d. %s', failure.num, failure.err.message);
  });

  console.log('');
  process.exit(failures.length);
}

global.test = function (name, fn) {
  tests.push({ name: name, fn: fn });
};

global.assert = function (pass, msg) {
  if (!pass) {
    throw new Error(msg);
  }
}


/*!
 * Import project
 */

global.AssertionError = require('../..');
