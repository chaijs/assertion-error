interface Result {
  name: 'AssertionError' | 'AssertionResult'
  ok: boolean
  toJSON(...args: unknown[]): Record<string, unknown>
}

declare class AssertionError<T> extends Error implements Result {
  [key: string]: unknown;
  name: 'AssertionError';
  ok: false;
  message: string;
  constructor(message: string, props?: T, ssf?: Function);
  stack: string;
  toJSON(stack?: boolean): Record<string, unknown>;
}

declare class AssertionResult<T> implements Result {
  [key: string]: unknown;
  name: 'AssertionResult';
  ok: true;
  message: string;
  constructor(props?: T);
  toJSON(): Record<string, unknown>;
}

export {Result, AssertionError, AssertionResult}