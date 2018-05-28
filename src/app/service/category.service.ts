import { Injectable } from '@angular/core';
import { AngularFireDatabase ,FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { CategoryMenagementComponent } from '../page/category-menagement/category-menagement.component';
import { Category } from '../model/category';


@Injectable()
export class CategoryService {

  constructor(
    private database:AngularFireDatabase
  ) { }



  save(category:Category){
    //user.sort = this.countUser();
    return this.database.list('/category').push(category);
  }

  getList():FirebaseListObservable<Category[]>{
    return this.database.list('/category');
  }

  update(category:Category){
    //user.sort = this.countUser();
    return this.database.list('/category').update(category.$key,category);
  }


}
