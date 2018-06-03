import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { storage } from 'firebase';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-menagement',
  templateUrl: './category-menagement.component.html',
  styleUrls: ['./category-menagement.component.scss']
})
export class CategoryMenagementComponent implements OnInit {

  constructor(
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private categoryService:CategoryService
  ) {

    this.getCategoryList();

   }
  section:string="index";

  category:Category={name:'',image:""}
  categoryList:Category[];

  uploadedImage: File;
  imagePreview: string;

  ngOnInit() {
  }

  sreach(category:Category){
    this.categoryService.search(category.name).subscribe(list=>{
      console.log(list.length);  
      if(list.length>0){
        this.category.name = '';
      }    
    })
  }

  getCategoryList(){
    this.categoryService.getList().subscribe(list=>{
      this.categoryList= list;
    })
  }
  
  gotoAdd(){
    this.section = "add";
  }
  gotoEdit(category:Category){
    this.section = "edit";
    this.category=category;
  }
  update(category:Category){
    this.categoryService.update(category).then(res=>{
      this.section = "index"
    })

  }

  delete(category:Category){
    this.categoryService.delete(category).then(res=>{
      this.section = "index"
    })

  }
  
  gotoIndex(){
    this.section = "index";
  }

  save(category:Category){
    this.categoryService.save(category).then(res=>{
      this.section = "index";
    });
    
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
