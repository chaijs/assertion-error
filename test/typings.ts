import AssertionError = require('../index');

const str: string = "";
let e: AssertionError;

function foo () { }

e = new AssertionError(str);
e = new AssertionError(str, {a:1, b:2});
e = new AssertionError(str, {a:1, b:2}, foo);

const assertionError: AssertionError<{ bar: number }> = new AssertionError("msg", { bar: 42 });
const msg: string = assertionError.message;
const bar: number = assertionError.bar;
