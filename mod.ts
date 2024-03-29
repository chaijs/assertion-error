import { Result } from "./index.d.ts";

type V8Error = ErrorConstructor & {
  // deno-lint-ignore ban-types
  captureStackTrace(err: Error, ssf: Function): void;
};

const canElideFrames = "captureStackTrace" in Error;

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
    if (canElideFrames) {
      (Error as V8Error).captureStackTrace(
        this,
        ssf || AssertionError,
      );
    }
    for (const key in props) {
      if (!(key in this)) {
        // @ts-ignore: allow arbitrary assignment of values onto class
        this[key] = props[key];
      }
    }
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
