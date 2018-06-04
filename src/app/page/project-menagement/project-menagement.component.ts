import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../model/project';
import { storage } from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Gallery } from '../../model/gallery';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-project-menagement',
  templateUrl: './project-menagement.component.html',
  styleUrls: ['./project-menagement.component.scss']
})
export class ProjectMenagementComponent implements OnInit {

  
  
  constructor(
    private projectService:ProjectService,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
    // public formBuilder: FormBuilder,
    // private domSanitizer:DomSanitizer
  ) {
    // this.from();
   }
  projectlist:Project[]
  uploadedImage: File;
  // projectFrom:FormGroup;

  map:string="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15492.138589744749!2d100.61402515!3d13.8968765!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d7d7e5ae6c7c5%3A0xa0d5d9da10ca3def!2z4LiV4Lil4Liy4LiU4Liq4Lin4Lix4Liq4LiU4Li04LiB4Liy4Lij4LiX4Lir4Liy4Lij4Lit4Liy4LiB4Liy4Lio!5e0!3m2!1sth!2sth!4v1527681452335";

  img:Gallery[]=[];

  ngOnInit() {
    this.getlist();
  }

  // from(){
  //   this.projectFrom = this.formBuilder.group({
  //     name:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(30)])],
  //     detail:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(500)])],
  //     category:['',Validators.compose([Validators.required])],
  //     status:[true,Validators.compose([Validators.required])],
  //     home:[true,Validators.compose([Validators.required])],
  //     contact:['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
  //     hostelry:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(30)])],
  //     imageproject:['',Validators.compose([Validators.required])],
  //     gallery:[null,Validators.compose([Validators.required])],
  //     location:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(30)])],
  //     store:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(30)])],
  //     travel:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(30)])],
  //     video:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(30)])],
  //   });
  // }

  // async youtube(url){
  //   return await this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  // }

  getlist(){
    this.projectService.getList().subscribe(list=>{
      this.projectlist=list
    })
  }
  section:string="index";
  project:Project={status:true,home:true,category:'',contact:'',detail:'',hostelry:'',imageproject:'',gallery:null,location:'',name:'',store:'',travel:'',video:'',};

  gotoAdd(){
    this.section = "add";
  }
  gotoEdit(project:Project){
    this.section = "edit";
    this.project=project;
  }
  update(project:Project){
    if(project.name!=''&&project.category!=''&&project.contact!=''&&project.detail!=''&&project.gallery!=null&&project.imageproject!=''&&project.location!=''&&project.status!=null&&project.store!=''&&project.travel!=''&&project.video!=''){
      this.projectService.update(project).then(res=>{
        this.section = "index"
        this.project = {status:true,home:true,category:'',contact:'',detail:'',hostelry:'',imageproject:'',gallery:null,location:'',name:'',store:'',travel:'',video:'',};
        this.project.gallery = [];
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'Success!',{toastLife: 3000, showCloseButton: true});
      })
    }else{
      this.toastr.error('กรุณาใส่ข้อมูลให้ครบ', 'Oops!',{toastLife: 5000,showCloseButton: true});
    }
    

  }
  delete(project:Project){
    this.projectService.delete(project).then(res=>{
      this.section = "index"
    })

  }

  setModel(project:Project){
    this.project = project;
  }


  gotoIndex(){
    this.section = "index";
  }
  save(project:Project){
    if(project.name!=''&&project.category!=''&&project.contact!=''&&project.detail!=''&&project.gallery!=null&&project.imageproject!=''&&project.location!=''&&project.status!=null&&project.store!=''&&project.travel!=''&&project.video!=''){
      this.projectService.save(project).then(res=>{
        this.section = "index";
        this.project = {status:true,home:true,category:'',contact:'',detail:'',hostelry:'',imageproject:'',gallery:null,location:'',name:'',store:'',travel:'',video:'',};
        this.project.gallery = [];
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'Success!',{toastLife: 3000, showCloseButton: true});
      })
    }else{
      this.toastr.error('กรุณาใส่ข้อมูลให้ครบ', 'Oops!',{toastLife: 5000,showCloseButton: true});
    }
      
  }
  onFileChange(event) {
    
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.ng2ImgMax.resizeImage(file,300,300,false).subscribe(
        result => {
          this.uploadedImage = new File([result], result.name);
          this.getImagePreview(this.uploadedImage);
          
        },
        error => {
          console.error('😢 Oh no!', error);
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
        // this.approver.pictureProfile =  res.downloadURL; 
        this.project.imageproject = res.downloadURL;
      }).catch(e=>{
        console.error(e);        
      })  
         
    };
  }

  
  onGaleryChange(event) {
    
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.ng2ImgMax.resizeImage(file,300,300,false).subscribe(
        result => {
          this.uploadedImage = new File([result], result.name);
          this.getGaleryPreview(this.uploadedImage);
          
        },
        error => {
          console.error('😢 Oh no!', error);
        }
      );
      
    }
  }

  getGaleryPreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //this.imagePreview = reader.result;
      console.log('reader',reader.result);      
      let name = 'img'+Date.now();      
      const picture = storage().ref().child('images/galery/'+name+'.jpg');
      picture.putString(reader.result,'data_url').then(res=>{
        console.log('picture:',res); 
        // this.approver.pictureProfile =  res.downloadURL; 
        if(this.project.gallery){
          this.project.gallery.push({image:res.downloadURL});
         }else{
          this.img.push({image:res.downloadURL});
          this.project.gallery = this.img;
         }  
      }).catch(e=>{
        console.error(e);        
      })  
         
    };
  }

  remove(index){
    console.log(index);
    // splice(ตำแหน่งที่ลบ,จำนวนที่จะลบ)
    let res = this.project.gallery.splice(index,1);
    console.log(res);    
    console.log("gallery====",this.project.gallery);
    
    
  }

  status(project:Project){
    if(project.status==true){
      project.status = false;
      this.projectService.update(project);
    }else{
      project.status = true;
      this.projectService.update(project);
    }
    
  }

  home(project:Project){
    if(project.home==true){
      project.home = false;
      this.projectService.update(project);
    }else{
      project.home = true;
      this.projectService.update(project);
    }
    
  }

  
}
