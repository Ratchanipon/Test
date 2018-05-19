import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserInfo } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { ApproverService } from '../../service/approver.service';
import { storage } from 'firebase/app';
import { Approver } from '../../model/Approver';
import { ToastsManager } from 'ng2-toastr';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadsService } from '../../service/uploads.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  approverForm:FormGroup;
  approver:Approver;
  uploadedImage: File;
  imagePreview: string;

  submit:boolean=true;

  constructor(
    public router:Router,
    private route: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
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
        //this.router.navigate(['account',{'key':'update'}]);      
        this.toastr.success('Save Data!', 'Success!',{toastLife: 3000, showCloseButton: true});
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


  back(){
    this.angularFireAuth.authState.subscribe(user => {
      if (user != null) {
        this.approverService.getApprover(user.uid).subscribe(user => {
          if (user.jobPosition == "admin") {
            
            sessionStorage.setItem('uid',user.jobPosition);
            //this.uid = sessionStorage.getItem('uid');
            this.router.navigate(['/approver']);
          }else if(user.jobPosition=="approver"&&user.statust==true){
            
            sessionStorage.setItem('uid',user.jobPosition);
           // this.uid = sessionStorage.getItem('uid');
            this.router.navigate(['/personal']);
          }
        });
        localStorage.setItem('uid',user.uid);
      } else {
        //this.uid = null;
        this.router.navigate(['/']);
      }
    })
  }

  

}
