import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { ApprovePersonal } from '../model/ApprovePersonal';

@Injectable()
export class PersonalService {

  constructor(
    private database:AngularFireDatabase
  ) { }

  getPersonalList():FirebaseListObservable<ApprovePersonal[]>{
    return this.database.list('approve_personal/');
  }

  getPersonal(key:string):FirebaseObjectObservable<ApprovePersonal>{
    return this.database.object('approve_personal/'+key);
  }

  updatePersonal(key:string,personal:ApprovePersonal){
    return this.database.object('approve_personal/'+key).update(personal);
  }


}
