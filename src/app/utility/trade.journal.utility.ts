import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { TradeJournal } from "../interface/trade.journal";

@Injectable({
  providedIn: 'root'
})
export class TradeJournalUtility{

  constructor(){}

  public formatTradejournal(form: NgForm): TradeJournal{
    var formValue = form.value;
    var journal: TradeJournal = {
      dateTime: formValue.date + "::" + formValue.time,
      tradeType: formValue.tradeType,
      entry: formValue.entry,
      exit: formValue.exit,
      volume: formValue.volume,
      stock: formValue.stock,
      stoploss: formValue.stoploss,
      plannedExit: formValue.plannedExit,
      imageUrl: formValue.imageUrl,
      tradeDuration: formValue.tradeDuration,
      psychology: formValue.psychology,
      tradeCost: formValue.tradeCost,
      rating: formValue.rating
    };

    return journal;
  }
}
