import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from '../enumeration/data.state.enum';
import { ApplicationState } from '../interface/application.state';
import { AuthenticationRequest } from '../interface/authentication.request';
import { ServerResponse } from '../interface/server.response';
import { LocalStorageService } from '../service/local-storage.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  appState$!: Observable<ApplicationState<ServerResponse<String>>>;
  readonly DataState = DataState;


  constructor(
    private authService: AuthService,
    private storageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  login(loginForm: NgForm): void {
    this.authService.login$(loginForm.value as AuthenticationRequest)
      .subscribe((response: any) => {
        if (response.statusCode === HttpStatusCode.Ok) {
          console.log("logged in");
          this.storageService.setToken(response.data);
          this.router.navigate(["/home"]);
        }
      },
      (error: String) => {
        console.log(error);
      });
  }

}
