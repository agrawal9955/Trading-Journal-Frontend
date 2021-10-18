import { TradeType } from "../enumeration/tradeType.enum";

export interface TradeJournal{
  _id?: String;
  dateTime: String;
  tradeType: TradeType;
  stock: String;
  entry: number;
  volume: number;
  stoploss: number;
  plannedExit: number;
  imageUrl: String;
  tradeDuration: String;
  psychology: String;
  tradeCost: number;
  exit?: number;
  rating?: number;
}
