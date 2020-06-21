import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  _userDetail: User[] = [];
  userChanged = new Subject<User[]>();

  getUserDetails() {
     this.userChanged.next([...this._userDetail]) // return new array with subject
  }

  setUserDetails(username, imagepath) {
    // add user details to array
    this._userDetail = [] // empty array
    this._userDetail = [new User(username, imagepath)]
    // add new user to subject
    this.userChanged.next(this._userDetail)
  }

  changeUsername(username) {
    // add user details to array
    this._userDetail[0].username = username // set new user name
    this.userChanged.next(this._userDetail)
    console.log(this._userDetail[0]) 
  }
}
