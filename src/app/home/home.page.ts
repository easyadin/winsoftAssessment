import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  userDetail: User[] = [];
  TodaysDate = new Date();
  private userSubscription: Subscription;

  constructor(
    private userSrv: UserService,
    private router: Router,
    private authService: AuthService,
  ) { }

  someText: string =
    `TypeScript is an open-source programming language developed and
     maintained by Microsoft. It is a strict syntactical
      superset of JavaScript and adds optional static 
      typing to the language. TypeScript is designed 
      for development of large applications and 
      transcompiles to JavaScript`

  ngOnInit() {
    this.userSubscription = this.userSrv.userChanged.subscribe(user => {
      this.userDetail = user;
    })
    this.userSrv.getUserDetails(); // init user details
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth')
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
