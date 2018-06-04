import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Category } from '../../model/category';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';
import { storage } from 'firebase';
import { CategoryService } from '../../service/category.service';
import { ToastsManager } from 'ng2-toastr';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-menagement',
  templateUrl: './category-menagement.component.html',
  styleUrls: ['./category-menagement.component.scss']
})
export class CategoryMenagementComponent implements OnInit {

  constructor(
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer,
    private categoryService:CategoryService,
    // public formBuilder: FormBuilder,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
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
        this.category = {name:"",image:""}; 
        this.toastr.error('ข้อมูลซ้ำกรุณาเลือกใหม่', 'Oops!',{toastLife: 5000,showCloseButton: true});
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
    if(category.name!=''&&category.image!=''){
      this.categoryService.update(category).then(res=>{
        this.section = "index";
        this.category = {name:'',image:""}; 
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'Success!',{toastLife: 3000, showCloseButton: true});
      });
    }else{
      this.toastr.error('กรุณาใส่ข้อมูลให้ครบ', 'Oops!',{toastLife: 5000,showCloseButton: true});
    }

  }

  delete(category:Category){
    this.categoryService.delete(category).then(res=>{
      this.section = "index"
      this.category = {name:'',image:""}; 
    })

  }

  setModel(category:Category){
    this.category = category;
  }
  
  gotoIndex(){
    this.section = "index";
  }

  save(category:Category){
    console.log(category);
    if(category.name!=''&&category.image!=''){
      this.categoryService.save(category).then(res=>{
        this.section = "index";
        this.category = {name:'',image:""}; 
        this.toastr.success('บันทึกข้อมูลสำเร็จ', 'Success!',{toastLife: 3000, showCloseButton: true});
      });
    }else{
      this.toastr.error('กรุณาใส่ข้อมูลให้ครบ', 'Oops!',{toastLife: 5000,showCloseButton: true});
    }
    
    
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
