import { Injectable } from '@angular/core';
import { AngularFireDatabase ,FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { User } from '../model/User';

@Injectable()
export class UserService {

  sort:number;
  constructor(
    private database:AngularFireDatabase
  ) { }


  saveUser(user:User){
    //user.sort = this.countUser();
    return this.database.list('User/').push(user);
  }

  getUserList():FirebaseListObservable<User[]>{
    return this.database.list('User/');
  }

  updateUser(key:string,user:User){
    return this.database.list('User/').update(key,user);
  }

  permissionUser(key:string,user:User){
    return this.database.object('User/'+key).update(user);
  }

  removeUser(key:string){
    return this.database.list('User/').remove(key);
  }

  countUser(){
    this.database.list('User/').subscribe(list=>{
        this.sort = list.length+1;
    })
    return this.sort;
  }




}
