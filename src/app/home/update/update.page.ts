import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  constructor(private userSrv: UserService, private router: Router) { }

  ngOnInit() {
  }

  username='' // new user name to set

  updateUsername() {
    if(this.username !=''){
      this.userSrv.changeUsername(this.username);
      this.router.navigateByUrl('/home') //navigate to home
    }
  }
}
