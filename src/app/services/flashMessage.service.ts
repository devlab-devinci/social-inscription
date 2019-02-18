import { Injectable } from '@angular/core';
import {forEach} from "@angular/router/src/utils/collection";


@Injectable({
  providedIn: 'root'
})

export class FlashMessage {
  public messages = [];
  constructor() {

  }

  setMessage(message, type="error"){
     this.messages.push({'message': message, 'type': type, 'time':Date.now(),'id' : Math.floor(Math.random() * Math.floor(9999999))});
  }

  getMessages(){
    this.messages.forEach( (messsage) => {
       if(messsage.time + 700 < Date.now()){
          this.deleteMessage(messsage.id);
       }
    });
    return this.messages;
  }



  deleteMessage(id){
    const newMessages = [];
    this.messages.forEach( (message) => {
      if( id != message.id ){
        newMessages.push(message);
      }
    });
    this.messages = newMessages;
  }

}
