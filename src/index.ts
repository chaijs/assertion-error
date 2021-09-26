export default class AssertionError<T> extends Error {
  name = 'AssertionError'
  showDiff: boolean
  [key: string]: any

  constructor(message: string, props?: T, ssf?: Function) {
    super(message)

    // default values
    this.message = message || 'Unspecified AssertionError';
    this.showDiff = false;

    // copy from properties
    for (var key in props) {
      if (!this[key]) {
        // @ts-ignore
        this[key] = props[key];
      }
    }

    // capture stack trace
    ssf = ssf || AssertionError;
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, ssf);
    } else {
      try {
        throw new Error();
      } catch(e: any) {
        this.stack = e.stack;
      }
    }
  }

  /**
   * Allow errors to be converted to JSON for static transfer.
   *
   * @param {Boolean} include stack (default: `true`)
   * @return {Object} object that can be `JSON.stringify`
   */

  toJSON(stack: boolean) {
    const {...props} = this

    // include stack if exists and not turned off
    if (false !== stack && this.stack) {
      props.stack = this.stack;
    }
    props.message = this.message

    return props;
  };
}
