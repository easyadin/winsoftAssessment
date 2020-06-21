import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  _userIsAuthenticated = false;
  
  login() {
    this._userIsAuthenticated = true;
    console.log("User authentication : " + this._userIsAuthenticated)
  }

  logout() {
    this._userIsAuthenticated = false;
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated
  }
  
}
