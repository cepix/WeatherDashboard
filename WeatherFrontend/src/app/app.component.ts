import { Component } from '@angular/core';

import { StompService } from 'ng2-stomp-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private profiles = ['Fulano','Mengano'];
  private subscription : any;
  title = 'Weather Dashboard';
  //response 
  
  public response = (data) => {
    console.log(data)
  }

  constructor(stomp: StompService) {
    
     //configuration 
     stomp.configure({
  
       host:'http://127.0.0.1:8080/api',
       debug:true,
       queue:{'init':true}
     });
     
     //start connection 
     stomp.startConnect().then(() => {
       stomp.done('init');
       console.log('connected');
       
       //subscribe 
       this.subscription = stomp.subscribe('/feed', this.response);
       
       //send data 
       
       stomp.send("/app/status",'Fulano');
       
       /*
       //unsubscribe 
       this.subscription.unsubscribe();
       
       //disconnect 
       stomp.disconnect().then(() => {
         console.log( 'Connection closed' )
       })
       */
     });
    



}
}
