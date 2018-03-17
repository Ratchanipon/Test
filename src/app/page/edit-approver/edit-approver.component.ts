import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Approver } from '../../model/Approver';
import { ApproverService } from '../../service/approver.service';
import { FileHolder } from 'angular2-image-upload';
import { UploadsService } from '../../service/uploads.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { storage } from 'firebase';


@Component({
  selector: 'app-edit-approver',
  templateUrl: './edit-approver.component.html',
  styleUrls: ['./edit-approver.component.css']
})
export class EditApproverComponent implements OnInit {


  approver:Approver;
  uploadedImage: File;
  imagePreview: string;

  constructor(
    public router:Router,
    private route: ActivatedRoute,
    private approverService:ApproverService,
    private uploadsService:UploadsService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) {
    this.route.params.subscribe(params=>{
      
      const key = params.key;
      this.approverService.getApprover(key).subscribe(aprover=>{
        this.approver = aprover;
        //this.imagePreview = aprover.pictureProfile;
        console.log(this.approver);
      })
    })
   }

  ngOnInit() {
  }

  update(approver){
    console.log(approver);
    this.approverService.updateApprover(approver.$key,approver).then(res=>{
      this.router.navigate(['approver']);
    }).catch(e=>{
      console.log(e);      
    })
    
  }

  onFileChange(event) {
    
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.ng2ImgMax.resizeImage(file,300,400,false).subscribe(
        result => {
          this.uploadedImage = new File([result], result.name);
          this.getImagePreview(this.uploadedImage);
          
        },
        error => {
          console.log('😢 Oh no!', error);
        }
      );
      
    }
  }

  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //this.imagePreview = reader.result;
      console.log('reader',reader.result);      
      let name = 'img'+Date.now();      
      const picture = storage().ref().child('images/img/'+name+'.jpg');
      picture.putString(reader.result,'data_url').then(res=>{
        console.log('picture:',res); 
        this.approver.pictureProfile =  res.downloadURL; 
      }).catch(e=>{
        console.error(e);        
      })  
         
    };
  }

  

}
