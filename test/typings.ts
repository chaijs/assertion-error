import AssertionError from '../src/index'

const str: string = "";
let e;

function foo () { }

e = new AssertionError(str);
e = new AssertionError(str, {a:1, b:2});
e = new AssertionError(str, {a:1, b:2}, foo);

const assertionError: AssertionError<{ bar: number }> = new AssertionError("msg", { bar: 42 });
const msg: string = assertionError.message;
const bar: number = assertionError.bar;

class DerivedAssertionError<T = {}> extends AssertionError<T> {

  public constructor(message, props?: T, ssf?: Function) {

    super(message, props, ssf);
  }
}

const errors: Error[] = [];
errors.push(new AssertionError("msg"));
errors.push(new AssertionError<{ bar: number }>("msg", { bar: 42 }));
errors.push(new DerivedAssertionError<{ bar: number }>("msg", { bar: 42 }));

