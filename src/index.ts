/**
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */
function exclude(...args: string[]): (a: Record<string, unknown>, b?: Record<string, unknown>) => Record<string, unknown> {
  var excludes = Array.from(args);

  function excludeProps (res: Record<string, unknown>, obj: Record<string, unknown>) {
    Object.keys(obj).forEach(function (key) {
      if (!~excludes.indexOf(key)) res[key] = obj[key];
    });
  }

  return function extendExclude () {
    var args = [].slice.call(arguments)
      , i = 0
      , res = {};

    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }

    return res;
  };
};

export default class AssertionError<T> extends Error {
  showDiff: boolean
  [key: string]: unknown

  constructor(message: string, _props?: T, ssf?: Function) {
    super()
    var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
      , props = extend(_props || {});

    // default values
    this.message = message || 'Unspecified AssertionError';
    this.showDiff = false;

    // copy from properties
    for (var key in props) {
      this[key] = props[key];
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
    var extend = exclude('constructor', 'toJSON', 'stack')
      , props = extend({ name: this.name }, this);

    // include stack if exists and not turned off
    if (false !== stack && this.stack) {
      props.stack = this.stack;
    }

    return props;
  };
}
