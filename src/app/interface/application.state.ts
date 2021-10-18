import { DataState } from "../enumeration/data.state.enum";

export interface ApplicationState<T>{
  dataState: DataState;
  appData?: T;
  error?: String;

  new(): ApplicationState<T>;
}
