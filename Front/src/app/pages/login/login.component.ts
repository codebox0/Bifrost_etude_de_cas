import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ServerService} from "../../services/server.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  erreurCreditential = false;

  user: any = {
    username: '',
    password: '',
    type: 'client'
  };

  connect: any;

  constructor(
    private router: Router,
    private serverService: ServerService
  ) {
  }

  ngOnInit() {

  }


  loginCheck() {
    console.log("login check : ", {...this.user});

    const data = null;
    this.serverService.userLogin(this.user)
      .subscribe(value => {
          this.connect = value;
          console.log('value detct : ', value);

          this.connect.client[0].role == "farmer" ?
            this.router.navigateByUrl('/farmer', {state: this.connect}) :
            this.router.navigateByUrl('/client', {state: this.connect});
        },
        error => {
          this.erreurCreditential = true;
        });
    console.log('connect : ', this.connect);
  }


  loginCreate() {
    console.log("login check : ", {...this.user});

    const data = null;
    this.serverService.userCreate(this.user)
      .subscribe(value => {
          this.connect = value;
          console.log('value detct : ', value);
        },
        error => {
          this.erreurCreditential = true;
        });
    console.log('connect : ', this.connect);
  }


  userLogin() {
    const data = this.serverService.userLogin(this.user);
    console.log('data : ', data);
  }


  onSubmit() {
    this.submitted = true;
  }

}
