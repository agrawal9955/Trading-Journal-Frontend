import { Gender } from "../enumeration/gender.enum";
import { TradeJournal } from "./trade.journal";

export interface User{
  _id?: String;
  name: String;
  email: String,
  password: String,
  phone: String;
  gender: Gender;
  tradeJournals: (TradeJournal[]);

  new(): User;

}
