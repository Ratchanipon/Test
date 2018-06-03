import { Injectable } from '@angular/core';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Creatarticle } from '../model/creatarticle';

@Injectable()
export class ActicleService {
  opts: FirebaseListFactoryOpts;
  constructor(
    private database:AngularFireDatabase
  ) {
    console.log('Hello CreatarticleProvider Provider');
  }
  save(creatarticle:Creatarticle){
    //user.sort = this.countUser();
    return this.database.list('/Creatarticle').push(creatarticle);

  }

  update(creatarticle:Creatarticle){
    //user.sort = this.countUser();
    return this.database.list('/Creatarticle').update(creatarticle.$key,creatarticle);

  }

  getlist():FirebaseListObservable<Creatarticle[]>{
    
    return this.database.list('/Creatarticle');
  }

}
