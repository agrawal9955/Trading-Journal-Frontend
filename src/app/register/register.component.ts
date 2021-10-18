import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { startWith, catchError } from 'rxjs/operators';
import { DataState } from '../enumeration/data.state.enum';
import { ApplicationState } from '../interface/application.state';
import { ServerResponse } from '../interface/server.response';
import { User } from '../interface/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  appState$?: Observable<ApplicationState<ServerResponse<User>>>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  register(registerForm: NgForm): void{
    this.authService.register$(registerForm.value as User)
    .subscribe(
      (response: any) => {
        if(response.statusCode === HttpStatusCode.Created){
          this.router.navigate(["/login"]);
        }
      },
      (error: String) => {
        return of({dataState: DataState.ERROR, error: error});
      });
  }

}
