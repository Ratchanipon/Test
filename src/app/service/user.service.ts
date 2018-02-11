import { Injectable } from '@angular/core';
import { AngularFireDatabase ,FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { User } from '../model/User';

@Injectable()
export class UserService {

  constructor(
    private database:AngularFireDatabase
  ) { }


  saveUser(user:User){
    return this.database.list('user/').push(user);
  }

  getUserList():FirebaseListObservable<User[]>{
    return this.database.list('user/');
  }

  updateUser(key:string,user:User){
    return this.database.list('user/').update(key,user);
  }

  removeUser(key:string){
    return this.database.list('user/').remove(key);
  }




}
