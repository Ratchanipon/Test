import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Upload } from '../model/Upload';
import { storage } from 'firebase';
import { Ng2ImgMaxService } from 'ng2-img-max';

@Injectable()
export class UploadsService {
  downloadURL:string;
  
  constructor() { }

    uploadImage(image){
      let name = 'img'+Date.now();      
      const picture = storage().ref().child('images/img/'+name+'.jpg');
      picture.putString(image,'data_url').then(res=>{
        console.log('picture:',res); 
        this.downloadURL =  res.downloadURL; 
      }).catch(e=>{
        console.error(e);        
      })
      return  picture;
    }


}
