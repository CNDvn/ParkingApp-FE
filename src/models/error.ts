export interface ErrorBase<T> {
    statusCode: number;
    name: string;
    message: T;
    timestamp: Date;
    path: string;
  }
  export interface Error<T> {
    response: {
      data: ErrorBase<T>;
    };
  }