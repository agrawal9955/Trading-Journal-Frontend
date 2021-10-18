import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { TradeType } from '../enumeration/tradeType.enum';
import { AuthenticationRequest } from '../interface/authentication.request';
import { ServerResponse } from '../interface/server.response';
import { TradeJournal } from '../interface/trade.journal';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private readonly apiUrl = 'http://localhost:8081';


  constructor(private http: HttpClient) { }

  user$ = <Observable<ServerResponse<User>>>
    this.http.get<ServerResponse<User>>(`${this.apiUrl}/user/`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  addJournal$ = (tradeJournal: TradeJournal) => <Observable<ServerResponse<User>>>
    this.http.post<ServerResponse<User>>(`${this.apiUrl}/user/journal/`, tradeJournal)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  // Delete Trade Journal
  deleteJournal$ = (tradeJournalId: String) => <Observable<ServerResponse<User>>>
    this.http.delete<ServerResponse<User>>(`${this.apiUrl}/user/journal/${tradeJournalId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  // // Filter for journals
  // filterJournal$ = (tradeType: TradeType, response: ServerResponse) => <Observable<ServerResponse>>
  // new Observable<ServerResponse>(
  //   Subscriber => {
  //     console.log(response);
  //     Subscriber.next();
  //     tradeType === TradeType.LONG? {

  //     }
  //   }
  // )
  // .pipe(
  //   tap(console.log),
  //   catchError(this.handleError)
  // );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`an error occured - Error Code: ${error.status}`);
  }
}
