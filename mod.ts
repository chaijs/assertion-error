const canElideFrames = 'captureStackTrace' in Error
const startStackFrames = new WeakMap()

interface Result {
  name: 'AssertionError' | 'AssertionResult'
  ok: boolean
  toJSON(...args: unknown[]): Record<string, unknown>
}

export class AssertionError<T> extends Error implements Result {
  [key: string]: unknown

  get name(): 'AssertionError' {
    return 'AssertionError'
  }

  get ok() {
    return false
  }

  constructor(public message = 'Unspecified AssertionError', props?: T, ssf?: Function) {
    super(message)
    if (canElideFrames && ssf) startStackFrames.set(this, ssf)
    for (const key in props) {
      if (!(key in this)) {
        // @ts-ignore
        this[key] = props[key];
      }
    }
  }

  get stack() {
    if (canElideFrames) {
      return (Error as any).captureStackTrace(this, startStackFrames.get(this) || AssertionError);
    } else {
      return super.stack
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
    }
  }

}

export class AssertionResult<T> implements Result {
  [key: string]: unknown

  get name(): 'AssertionResult' {
    return 'AssertionResult'
  }

  get ok() {
    return true
  }

  constructor(props?: T) {
    for (const key in props) {
      if (!(key in this)) {
        // @ts-ignore
        this[key] = props[key];
      }
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      ...this,
      name: this.name,
      ok: this.ok,
    }
  }
}
