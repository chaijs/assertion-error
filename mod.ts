import { Result } from "./index.d.ts";

// deno-lint-ignore ban-types
type V8Error = ErrorConstructor & { captureStackTrace(err: Error, ssf: Function): void };

const canElideFrames = "captureStackTrace" in Error;
const startStackFrames = new WeakMap();

export class AssertionError<T> extends Error implements Result {
  [key: string]: unknown

  get name(): "AssertionError" {
    return "AssertionError";
  }

  get ok() {
    return false;
  }

  constructor(
    public message = "Unspecified AssertionError",
    props?: T,
    // deno-lint-ignore ban-types
    ssf?: Function,
  ) {
    super(message);
    if (canElideFrames && ssf) startStackFrames.set(this, ssf);
    for (const key in props) {
      if (!(key in this)) {
        // @ts-ignore: allow arbitrary assignment of values onto class
        this[key] = props[key];
      }
    }
  }

  get stack() {
    if (canElideFrames) {
      (Error as V8Error).captureStackTrace(
        this,
        startStackFrames.get(this) || AssertionError,
      );
    }
    return super.stack;
  }

  toJSON(stack?: boolean): Record<string, unknown> {
    return {
      ...this,
      name: this.name,
      message: this.message,
      ok: false,
      // include stack if exists and not turned off
      stack: stack !== false ? this.stack : undefined,
    };
  }
}

export class AssertionResult<T> implements Result {
  [key: string]: unknown

  get name(): "AssertionResult" {
    return "AssertionResult";
  }

  get ok() {
    return true;
  }

  constructor(props?: T) {
    for (const key in props) {
      if (!(key in this)) {
        // @ts-ignore: allow arbitrary assignment of values onto class
        this[key] = props[key];
      }
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      ...this,
      name: this.name,
      ok: this.ok,
    };
  }
}
