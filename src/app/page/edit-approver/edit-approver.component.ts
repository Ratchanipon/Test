import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Approver } from '../../model/Approver';
import { ApproverService } from '../../service/approver.service';
import { FileHolder } from 'angular2-image-upload';
import { UploadsService } from '../../service/uploads.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { storage } from 'firebase';
import { ToastsManager } from 'ng2-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-approver',
  templateUrl: './edit-approver.component.html',
  styleUrls: ['./edit-approver.component.css']
})
export class EditApproverComponent implements OnInit {

  approverForm:FormGroup;
  approver:Approver;
  uploadedImage: File;
  imagePreview: string;

  submit:boolean=true;

  constructor(
    public router:Router,
    private route: ActivatedRoute,
    private approverService:ApproverService,
    private uploadsService:UploadsService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);

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

    // this.approverForm = new FormGroup({
    //   'key': new FormControl(this.approver.$key, [Validators.required]),
    //   'email': new FormControl(this.approver.email, [Validators.required]),
    //   'titleName': new FormControl(this.approver.titleName, [Validators.required]),
    //   'firstName': new FormControl(this.approver.firstName, [Validators.required, Validators.minLength(3)]),
    //   'lastName': new FormControl(this.approver.lastName, [Validators.required, Validators.minLength(3)]),
    //   'jobPosition': new FormControl(this.approver.jobPosition, [Validators.required]),
    //   'pictureProfile': new FormControl(this.approver.pictureProfile, [Validators.required]),
    //   'sort': new FormControl(this.approver.sort, [Validators.required]),
    //   'statust': new FormControl(this.approver.statust, [Validators.required]),
    //   'token': new FormControl(this.approver.token, [Validators.required]),
    // });

  }

  update(approver:Approver){
    console.log(approver);
    if(approver.firstName!=' '&&approver.lastName!=' '&&approver.pictureProfile!=' '){
      this.approverService.updateApprover(approver.$key,approver).then(res=>{
        this.router.navigate(['approver',{'key':'update'}]);      
      }).catch(e=>{
        console.log(e);   
        this.toastr.error(e, 'Oops!',{toastLife: 10000,showCloseButton: true});   
      })
    }else{
      this.toastr.error('Please fill in all information.', 'Oops!',{toastLife: 10000,showCloseButton: true});
    }    
    
  }
  
  checkName(){
      if(this.approver.firstName.length<3||this.approver.lastName.length<3){
        this.submit = false;
        this.toastr.error('FirstName and LastName more than 4 characters..', 'Oops!',{toastLife: 10000,showCloseButton: true});
      }else{
        this.submit = true;
      }
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
