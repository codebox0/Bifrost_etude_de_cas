import {Component, OnInit} from '@angular/core';
import {ServerService} from "../../services/server.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {
  submitted = false;
  current_offer: boolean = false;
  wallet: number = 0;
  devise: string = "€";
  totalPrice: number = 0;
  data: any;
  user: any;


  offerList: any[] = [{
    fruitName: 'Framboise',
    quantity: 0,
    price: 100,
  }];

  FruitName: string;
  Quantity: number;
  price: number;

  constructor(
    private serverService: ServerService,
    private router: Router) {
    this.data = this.router.getCurrentNavigation().extras.state;

    if(this.data) {
      this.user = this.data.client[0];
      this.sellOfferList();
    }else {
      this.user = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user : ', JSON.stringify(this.user));
      this.sellOfferList();
    }
    console.log('user : ', this.user);
    // localStorage.setItem('user : ', JSON.stringify(this.user));
  }

  ngOnInit() {
  }

  formSubmit() {

  }

  buyOffer() {

  }

  sellOfferList() {
    this.serverService.getOfferList()
      .subscribe((value: any[]) => {
          console.log('this.value value  : ', value.value);
          if  (value.value[0]) {
            this.current_offer = true;
            this.offerList = value.value;
            console.log('this.offer this.offer  : ', this.offerList);
          }
          else {
            this.current_offer = false;
            console.log('value detct : ', value);
          }
        },
        error => {
          this.current_offer = false;
        });
  }


  onSubmit() {
    this.submitted = true;
  }
}
