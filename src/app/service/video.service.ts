import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Video } from '../model/video';
@Injectable()
export class VideoService {

  
  constructor(
    private database:AngularFireDatabase
  ) { }

  getList():FirebaseListObservable<Video[]>{
    return this.database.list('/video');
  }
  save(video:Video){
    //user.sort = this.countUser();
    return this.database.list('/video').push(video);
  }

  delete(video:Video){
    //user.sort = this.countUser();
    return this.database.list('/video').remove(video.$key);
  }
  update(video:Video){
    //user.sort = this.countUser();
    return this.database.list('/video').update(video.$key,video);
  }


  }