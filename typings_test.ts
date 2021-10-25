// deno-lint-ignore-file no-unused-vars

import { AssertionError } from "./mod.ts";

let e: AssertionError<unknown> | null;

function foo() {}

e = new AssertionError("");
e = new AssertionError("", { a: 1, b: 2 });
e = new AssertionError("", { a: 1, b: 2 }, foo);

const assertionError: AssertionError<{ bar: number }> = new AssertionError(
  "msg",
  { bar: 42 },
);
const msg: string = assertionError.message;

// @fixme - shouldnt need `as number`
const bar: number = assertionError.bar as number;

class DerivedAssertionError<T = Record<string, unknown>>
  extends AssertionError<T> {
  // deno-lint-ignore ban-types
  public constructor(message: string, props?: T, ssf?: Function) {
    super(message, props, ssf);
  }
}

const errors: Error[] = [];
errors.push(new AssertionError("msg"));
errors.push(new AssertionError<{ bar: number }>("msg", { bar: 42 }));
errors.push(new DerivedAssertionError<{ bar: number }>("msg", { bar: 42 }));
