import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from '../enumeration/data.state.enum';
import { TradeType } from '../enumeration/tradeType.enum';
import { ApplicationState } from '../interface/application.state';
import { ServerResponse } from '../interface/server.response';
import { TradeJournal } from '../interface/trade.journal';
import { User } from '../interface/user';
import { LocalStorageService } from '../service/local-storage.service';
import { UserService } from '../service/user.service';
import { TradeJournalUtility } from '../utility/trade.journal.utility';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('closeAddJournalButton')
  closeAddJournalButton!: ElementRef;

  analyticsView: boolean = false;
  appState$?: Observable<ApplicationState<ServerResponse<User>>>;
  private dataSubject = new BehaviorSubject<ServerResponse<User>>(null as unknown as ServerResponse<User>);
  readonly DataState = DataState;

  constructor(
    private userService: UserService,
    private storageService: LocalStorageService,
    private router: Router,
    private tradeJournalUtility: TradeJournalUtility
  ) { }

  ngOnInit(): void {
    this.appState$ = <Observable<ApplicationState<ServerResponse<User>>>>this.userService.user$
      .pipe(
        map(response => {
          if (response.statusCode == HttpStatusCode.Ok) {
            this.dataSubject.next(response);
            return { dataState: DataState.LOADED, appData: response }
          }
          else return { dataState: DataState.ERROR, error: response.message }
        }),
        startWith(() => {
          return { dataState: DataState.LOADING };
        }),
        catchError((error: String) => {
          console.log(error);
          return of({ dataState: DataState.ERROR, error: error })
        })
      );
  }

  logout(): void {
    this.storageService.clear();
    this.router.navigate(['/login']);
  }

  addJournal(addJournalForm: NgForm): void {
    var journal: TradeJournal = this.tradeJournalUtility.formatTradejournal(addJournalForm);

    this.appState$ = <Observable<ApplicationState<ServerResponse<User>>>>this.userService.addJournal$(journal)
      .pipe(
        map(response => {
          this.dataSubject.next(response);
          if (response.statusCode == HttpStatusCode.Created) {
            this.closeAddJournalButton.nativeElement.click();
            return { dataState: DataState.LOADED, appData: response }
          }
          else return { dataState: DataState.ERROR, error: response.message }
        }),
        startWith(() => {
          return { dataState: DataState.LOADING };
        }),
        catchError((error: String) => {
          console.log(error);
          return of({ dataState: DataState.ERROR, error: error })
        })
      );
  }

  deleteJournal(journal: TradeJournal): void {
    this.appState$ = <Observable<ApplicationState<ServerResponse<User>>>>this.userService.deleteJournal$(journal._id || "")
      .pipe(
        map(response => {
          this.dataSubject.next(response);
          if (response.statusCode == HttpStatusCode.Ok) {
            return { dataState: DataState.LOADED, appData: response }
          }
          else return { dataState: DataState.ERROR, error: response.message }
        }),
        startWith(() => {
          return { dataState: DataState.LOADING };
        }),
        catchError((error: String) => {
          console.log(error);
          return of({ dataState: DataState.ERROR, error: error })
        })
      );
  }

  enableAnalyticsView(): void{
    this.analyticsView = true;
  }

  disableAnalyticsView(): void{
    this.analyticsView = false;
  }

  isAnalyticsViewEnabled(): boolean{
    return this.analyticsView;
  }

  isJournalClosed(journal: TradeJournal): boolean {
    if (journal.exit !== null) return true;
    return false;
  }

  getJournalPnL(journal: TradeJournal): number {
    if (journal.tradeType === TradeType.LONG) return (journal.volume * ((journal.exit || 0) - (journal.entry || 0)));
    else return (journal.volume * ((journal.entry || 0) - (journal.exit || 0)));
  }
}
