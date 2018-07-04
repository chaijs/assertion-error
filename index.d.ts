declare class AssertionError<T = {}> extends Error {

  public constructor(message: string, props?: T, ssf?: Function);

  public toJSON(stack?: any): any;

  [key: string]: any;
}

export = AssertionError;
