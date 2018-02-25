import { Injectable } from '@angular/core';
import { Approver } from '../model/Approver';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

@Injectable()
export class ApproverService {

  approver:Approver;

  constructor(
    private database:AngularFireDatabase
  ) { }

  saveApprover(email:string,uid:string){
    //user.sort = this.countUser();
    this.approver = {
      email:email,
      titleName:' ',
      firstName:' ',
      lastName:' ',
      jobPosition:' ',
      pictureProfile:' ',
      statust:true,
      token:' '
    }
    return this.database.object('approver/'+uid).set(this.approver);
  }

  getApproverList():FirebaseListObservable<Approver[]>{
    return this.database.list('approver/');
  }

  getApprover(key:string):FirebaseObjectObservable<Approver>{
    return this.database.object('approver/'+key);
  }

  updateApprover(key:string,approver:Approver){
    return this.database.object('approver/'+key).update(approver);
  }

}
