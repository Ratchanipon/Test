import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Project } from '../model/project';

@Injectable()
export class ProjectService {

  constructor(
    private database:AngularFireDatabase
  ) { }



  save(project:Project){
    //user.sort = this.countUser();
    return this.database.list('/project').push(project);
  }

  getList():FirebaseListObservable<Project[]>{
    return this.database.list('/project');
  }

  update(project:Project){
    //user.sort = this.countUser();
    return this.database.list('/project').update(project.$key,project);
  }



}
