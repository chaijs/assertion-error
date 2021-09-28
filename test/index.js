/*!
 * Include lib
 */

import {AssertionError, AssertionResult} from '../dist/mod.js'

/*!
 * Simple test runner.
 */

var count = 0
  , failures = []
  , tests = [];

function test (name, fn) {
  tests.push({ name: name, fn: fn });
}

function assert (pass, msg) {
  if (!pass) throw new Error(msg);
}

function suite(name, fn) {
  fn(test, assert);

  console.log(name);
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
  if (failures.length) process.exit(failures.length);
};

/*!
 * Load the tests
 */

suite('AssertionError', function (test, assert) {
  test('construction', function () {
    var err = new AssertionError();
    assert(err instanceof Error, 'instanceof Error');
    assert(err instanceof AssertionError, 'instanceof AssertionError');
    assert(err.name && err.name === 'AssertionError', 'name === "AssertionError"');
    assert(err.ok === false, 'has ok=false prop');
  });

  test('message', function () {
    var err = new AssertionError('Oops.')
      , empty = new AssertionError();
    assert(err.message === 'Oops.', 'w/ err.message');
    assert(empty.message === 'Unspecified AssertionError', 'w/o err.message');
  });

  test('stack', function() {
    assert(typeof new AssertionError().stack === 'string');
  });

  test('custom properties', function () {
    var err = new AssertionError('good message', {
        name: 'ShouldNotExist'
      , ok: true
      , hello: 'universe'
      , message: 'bad message'
      , stack: 'custom stack'
    });

    assert(err.name === 'AssertionError', 'does not overwrite name');
    assert(err.ok === false, 'does not overwrite ok');
    assert(err.message === 'good message', 'does not overwrite message');
    assert(err.hello && err.hello === 'universe', 'has custom property');

    // some browsers don't have stack
    if (err.stack) {
      assert(err.stack && err.stack !== 'custom stack', 'does not overwrite stack');
    }
  });

  test('.toJSON()', function () {
    var err = new AssertionError('some message', {
        hello: 'universe'
      , goodbye: 'known'
    });

    var json = err.toJSON();

    assert(json.name === 'AssertionError', 'json has name');
    assert(json.ok === false, 'json has ok');
    assert(json.message === 'some message', 'json has message');
    assert(json.hello === 'universe' && json.goodbye === 'known', 'json has custom properties');

    // some browsers don't have stack
    if (err.stack) {
      assert('string' === typeof json.stack, 'json has stack');
    }

    var nostack = err.toJSON(false);
    assert(!nostack.stack, 'no stack on false argument');
  });
});

suite('AssertionResult', function (test, assert) {
  test('construction', function () {
    var res = new AssertionResult();
    assert(res instanceof Error === false, 'not instanceof Error');
    assert(res instanceof AssertionResult, 'instanceof AssertionResult');
    assert(res.name && res.name === 'AssertionResult', 'name === "AssertionResult"');
    assert(res.ok === true, 'has ok=true prop');
  });

  test('message', function () {
    var res = new AssertionResult('Oops.')
    assert('message' in res === false, 'has no message prop');
  });

  test('stack', function() {
    var res = new AssertionResult()
    assert('stack' in res === false, 'has no stack');
  });

  test('custom properties', function () {
    var res = new AssertionResult({
        name: 'ShouldNotExist'
      , ok: false
      , hello: 'universe'
      , message: 'good message'
      , stack: 'custom stack'
    });

    assert(res.name === 'AssertionResult', 'does not overwrite name');
    assert(res.ok === true, 'does not overwrite ok property');
    assert(res.message === 'good message', 'can overwrite message');
    assert(res.hello && res.hello === 'universe', 'has custom property');
    assert(res.stack && res.stack === 'custom stack', 'can overwrite stack');
  });

  test('.toJSON()', function () {
    var res = new AssertionResult({
        hello: 'universe'
      , goodbye: 'known'
    });

    var json = res.toJSON();

    assert(json.name === 'AssertionResult', 'json has name');
    assert(json.ok === true, 'json has ok');
    assert(json.hello === 'universe' && json.goodbye === 'known', 'json has custom properties');
  });
});
