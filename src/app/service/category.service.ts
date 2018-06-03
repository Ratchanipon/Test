import { Injectable } from '@angular/core';
import { AngularFireDatabase ,FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { CategoryMenagementComponent } from '../page/category-menagement/category-menagement.component';
import { Category } from '../model/category';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';


@Injectable()
export class CategoryService {

  opts: FirebaseListFactoryOpts;
  constructor(
    private database:AngularFireDatabase
  ) { }


  search(keyword:string):FirebaseListObservable<Category[]>{
    this.opts = {
      query: {
        orderByChild: 'name',
        equalTo: keyword
      }
    };
    return this.database.list('/category',this.opts);
  }

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

  delete(category:Category){
    //user.sort = this.countUser();
    return this.database.list('/category').remove(category.$key);
  }


}
