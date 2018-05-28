import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../model/project';
import { storage } from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-menagement',
  templateUrl: './project-menagement.component.html',
  styleUrls: ['./project-menagement.component.scss']
})
export class ProjectMenagementComponent implements OnInit {

  [x: string]: any;
  constructor(
    private projectService:ProjectService,
    private domSanitizer:DomSanitizer
  ) { }
  projectlist:Project[]

  ngOnInit() {
    
  }

  async youtube(url){
    return await this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getlist(){
    this.projectService.getList().subscribe(list=>{
      this.projectlist=list
    })
  }
  section:string="index";
  project:Project={category:'',contact:'',detail:'',hostelry:'',imageproject:'',gallery:null,location:'',name:'',store:'',travel:'',video:'https://www.youtube.com/embed/0dDGUBr3eH0',};

  gotoAdd(){
    this.section = "add";
  }
  gotoEdit(project:Project){
    this.section = "edit";
    this.project=project;
  }
  update(project:Project){
    this.projectService.update(project).then(res=>{
      this.section = "index"
    })

  }
  gotoIndex(){
    this.section = "index";
  }
  save(){

  }
  onFileChange(event) {
    
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.ng2ImgMax.resizeImage(file,512,288,false).subscribe(
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
        this.category.image = res.downloadURL;
      }).catch(e=>{
        console.error(e);        
      })  
         
    };
  }
}
