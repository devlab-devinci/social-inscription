import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase} from 'angularfire2/database';
import { User } from '../models/User';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  projects = [];
  constructor(public auth : AuthService, public afStore : AngularFirestore) { }
  ngOnInit() {
    this.auth.user.subscribe(user => {
        if(user){
          const projects = this.afStore.collection('projects');
                    
        }
    });
  }
}
