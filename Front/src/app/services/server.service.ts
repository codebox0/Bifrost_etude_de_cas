import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
// import 'rxjs/operator';
import {Subject} from 'rxjs';

// const Base_URL = 'http://localhost:3000/';
// const Base_URL = 'api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn : 'root'
})
export class ServerService {
  // Base_URL = 'http://localhost:3000/';
  Base_URL = 'api/';


  constructor(private http: HttpClient) {}

  configUrl = 'data/jobs.json';
  jobs: any;
  jobsSubject = new Subject();
  searchResultSubject = new Subject();

  // Base_URL = 'api/';
  // Base_URL = 'http://167.99.159.83:8080/';


  getChatResponse(msgToBot) {

    /* let msgg: ChatMessage = {false, msgToBot}; */
    return this.http.get(this.Base_URL + `chat/${msgToBot.msg}`);
      /* .pipe(
        map(res => {
          res = res;
          console.log('res---', res);
          //res = { data: res.data, success: res.success };
        })
      ); */
  }



  getOfferList() {
    /* let msgg: ChatMessage = {false, msgToBot}; */
    return this.http.get(this.Base_URL + `offer/list/sell`);
      /* .pipe(
        map(res => {
          res = res;
          console.log('res---', res);
          //res = { data: res.data, success: res.success };
        })
      ); */
  }

  userLogin( user : any){
    return this.http.post(this.Base_URL + 'login', user);
  }

  userCreate( user : any){
    return this.http.post(this.Base_URL + 'create', user);
  }

  offerCreate( offer : any){
    return this.http.post(this.Base_URL + 'create/offer', offer);
  }


  offerListToSell( offer : any){
    return this.http.post(this.Base_URL + 'offer/list/sell', offer);
  }


  offerListFarmer( farmerID : any){
    return this.http.post(this.Base_URL + 'offer/check', farmerID);
  }

}
