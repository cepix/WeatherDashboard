import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Dashboard } from "./app.component";
import {HttpClientModule} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { HttpHeaders } from "@angular/common/http";


@Injectable()
export class HttpServiceService {

    apiUrl = "http://localhost:8080/"
    dashboardList : Dashboard[]
    public yahooLocations: JSON;
    headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin','*')
    .set('Content-Type', 'Application/json');
    
    constructor(private http: HttpClient) {
      this.updateDashboardList();
    }

public handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
}


updateDashboardList() {
  
  this.http.get<Dashboard[]>(this.apiUrl+'dashboards').subscribe(data => {
  
      this.dashboardList = data;
         (err: HttpErrorResponse) => {
      
         console.log("There was an error in the dashboard POST operation:");
       if (err.error instanceof Error) {
         // A client-side or network error occurred. Handle it accordingly.
         console.log('An error occurred:', err.message);
       } else {
         // The backend returned an unsuccessful response code.
         // The response body may contain clues as to what went wrong,
         console.log(`Backend returned code ${err.status}, body was: ${err.message}`);
         
       }
       
     }
  })
}

postDashboard(body){

  //return this.http.post(this.apiUrl+'dashboards',body);
  this.http.post(this.apiUrl+'dashboards/update',body,{headers: this.headers,responseType: "json"}).subscribe(data => {
    console.log("Dashboard created/updated: \n"+JSON.stringify(data));
  },  (err: HttpErrorResponse) => {
 
    console.log("There was an error in the dashboard POST operation:");
  if (err.error instanceof Error) {
    // A client-side or network error occurred. Handle it accordingly.
    console.log('An error occurred:', err.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    
  }
  
})
//update the general Dashboard List after adding the new dashboard
this.updateDashboardList();
}

locationSearch(text){


  this.http.get<JSON>('https://query.yahooapis.com/v1/public/yql?q=select%20woeid%2Cname%2Ccountry%20from%20geo.places%20where%20text%3D%22'+text+'*%22&format=json&diagnostics=true&callback=').subscribe(data => {
    console.log("Locations retrieved from yahoo, text search: "+text);

    this.yahooLocations=data['query']['results']['place']
  },  (err: HttpErrorResponse) => {
 
    console.log("There was an error in the dashboard POST operation:");
  if (err.error instanceof Error) {
    // A client-side or network error occurred. Handle it accordingly.
    console.log('An error occurred:', err.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
    
  }
  
})
}

}



