export interface ServerResponse<T>{
  timeStamp: Date;
  statusCode: number;
  status?: String;
  reason?: String;
  message?: String;
  developerMessage?: String;
  data: T
}
