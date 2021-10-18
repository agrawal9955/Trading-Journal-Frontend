import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  constructor() { }

  public getToken() {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // public getRoles() {
  //   return JSON.parse(localStorage.getItem('roles'));
  // }

  // public setRoles(roles: string[]) {
  //   return localStorage.setItem('roles', JSON.stringify(roles));
  // }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getToken() != null;
  }
}
