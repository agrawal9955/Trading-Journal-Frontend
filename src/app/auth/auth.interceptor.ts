import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LocalStorageService } from "../service/local-storage.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(
    private storageService: LocalStorageService,
    private router: Router
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.get('No-Auth') === 'True'){
      return next.handle(req.clone());
    }

    const token = this.storageService.getToken();

    req = this.addToken(req, <string>token);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        if(error.status === HttpStatusCode.Unauthorized) this.router.navigate(["/login"]);
        return throwError("Something is Wrong");
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: String) {
    return request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

}
