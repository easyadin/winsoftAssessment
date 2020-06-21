import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false; // to activate spinner
  selectedFile = '';
  isLogin = true;
  userDetail: User[] = [];
  imageUrl;
  fullname;
  username;
  password;
  image;


  constructor(
    private userCtrl: UserService,
    private loadingCtrl: LoadingController, private authService: AuthService, private router: Router) { }
  ngOnInit() {
  }



  // function reads image and convert to base64
  onImageInputChanged(event) {
    this.selectedFile = event.target.files[0].name

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.imageUrl = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  onSubmit(form: NgForm) {
    // check form validation
    if (!form.valid) {
      return; // cannot proceed
    }

    // set user details
    this.fullname = form.value.name;
    this.username = form.value.username;
    this.password = form.value.password;
    this.image = this.imageUrl;


    // For login
    if (this.isLogin === true && this.username === "test" && this.password === "password") {
      // send request to login service
      this.isLoading = true; // loading spinner
      this.authService.login(); // toggle authentication
      // static values for login
      this.userCtrl.setUserDetails(this.username, 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')
      // loading spinner
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Loading' })
        .then(loadingEl => {
          loadingEl.present();
          setTimeout(() => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/home') //navigate to home
          }, 1500)
        })
    }
    //register
    if (this.isLogin === false && this.username != "test" && this.password != "password") {
      // send request to register service
      this.userCtrl.setUserDetails(this.username, this.image)
      // send request to register service
      this.isLoading = true; // loading spinner
      this.authService.login(); // toggle authentication
      this.loadingCtrl
        .create({ keyboardClose: true, message: 'Loading' })
        .then(loadingEl => {
          loadingEl.present();
          setTimeout(() => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/home') //navigate to home
          }, 1500)
        })
    }

    // this is just to inform you of the password to use
    if (this.isLogin === true && this.username != "test" && this.password != "password") {
      alert("username :test | password: password")
    }
  }

  // toggle between register and login
  onSwitchAuthMode() {
    this.isLogin = !this.isLogin
  }
}
