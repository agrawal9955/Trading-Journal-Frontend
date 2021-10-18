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

export class AuthService {
  private readonly apiUrl = 'http://localhost:8081';

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private http: HttpClient) { }

  register$ = (user: User) => <Observable<ServerResponse<User>>>
    this.http.post<ServerResponse<User>>(`${this.apiUrl}/auth/register`, user, {headers: this.requestHeader})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  login$ = (authRequest: AuthenticationRequest) => <Observable<ServerResponse<String>>>
    this.http.post<ServerResponse<String>>(`${this.apiUrl}/auth/login`, authRequest, {headers: this.requestHeader})
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`an error occured - Error Code: ${error.status}`);
  }
}
