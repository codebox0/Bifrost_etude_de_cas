import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ServerService} from "../../services/server.service";

@Component({
  selector: 'app-farmer-view',
  templateUrl: './farmer-view.component.html',
  styleUrls: ['./farmer-view.component.scss']
})
export class FarmerViewComponent implements OnInit {

  submitted = false;
  current_offer: boolean = false;
  data: any = null;
  user: any;

  offer: any =  {
    fruitName: '',
    fruitQuantity: 0,
    fruitUnitPriceEUR: 0,
    period: 'period',
    isSell: false,
    idBuyer: ''

  };

  FruitName: string;
  Quantity: number;
  price: number;

  constructor(
    private router: Router,
    private serverService: ServerService
  ) {
    this.data = this.router.getCurrentNavigation().extras.state;

     if(this.data) {
         this.user = this.data.client[0]
       this.offerCheck();
       }else {
       this.user = JSON.parse(localStorage.getItem('user'));
     }
    console.log('user : ', this.user);
  }

  ngOnInit() {
  }

  formSubmit() {
    this.submitted = true;
    this.current_offer = true;

  }


  onSubmit() {
    this.submitted = true;
    this.current_offer = true;
  }

  removeOffer (){

    this.offer =  {
      fruitName: '',
      fruitQuantity: 0,
      fruitUnitPriceEUR: 0,
      period: 'period',
      isSell: false,
      idBuyer: ''

    };

    this.current_offer = false;

  }

  editOffer (){
    this.current_offer = false;
  }


  createOffer (){
    console.log("login check : ", {...this.user});

    let data = {
      farmerID: this.user.farmerID,
      ...this.offer,
      period: 'period'
    };
    this.serverService.offerCreate(data)
      .subscribe(value => {
          this.current_offer = true;
          console.log('value detct : ', value);
        },
        error => {
          this.current_offer = false;
        });
  }


  offerCheck (){
    console.log("login check : ", {...this.user});
    this.serverService.offerListFarmer(this.user.farmerID)
      .subscribe((value: any[]) => {
          console.log('this.value value  : ', value.value);
          if  (value.value[0]) {
           this.current_offer = true;
           this.offer = value.value[0];
           console.log('this.offer this.offer  : ', this.offer);
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


}
