export class Result<T> {
  isOk: boolean;
  isFailure: boolean;
  message: string;
  _value: T;

  private constructor(ok: boolean, message?: string, value?: T) {
    this.isOk = ok;
    this.isFailure = !ok;
    this.message = message as string;
    this._value = value as T;
  }

  public get value(): T {
    return this._value;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result(true, undefined, value);
  }

  public static fail<U>(message: string): Result<U> {
    return new Result(true, message);
  }
}
