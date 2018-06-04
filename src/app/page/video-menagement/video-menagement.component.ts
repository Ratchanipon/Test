import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { VideoService } from '../../service/video.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Video } from '../../model/video';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-video-menagement',
  templateUrl: './video-menagement.component.html',
  styleUrls: ['./video-menagement.component.scss']
})



export class VideoMenagementComponent implements OnInit {

  videoList: Video[];
  projectList:Project[];

  constructor(
    private videoService: VideoService,
    private projectService:ProjectService,
    private angularFireAuth: AngularFireAuth,
    public toastr: ToastsManager, 
    vcr: ViewContainerRef,
  ) {

    this.videoService.getList().subscribe(list => {
      this.videoList = list;
      console.log(this.videoList);
    })
  }

  ngOnInit() {
    this.getProjectList();
  }

  getProjectList(){
    this.projectService.getList().subscribe(list=>{
      this.projectList = list;
    })
  }

  section: string = "index";
  video: Video = { name: '', category: '', detail: '', link: '' };
  gotoIndex() {
    this.section = "index";
  }

  gotoAdd() {
    this.section = "add";
    
  }

  setModel(video: Video){
    this.video = video;
  }

  save(video: Video) {
    if(video.name!=''&&video.link!=''&&video.detail!=''&&video.category!=''){
      this.videoService.save(video).then(res => {
        this.section = "index";
        this.video = { name: '', category: '', detail: '', link: '' };
      })
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'Success!',{toastLife: 3000, showCloseButton: true});
    }else{
      this.toastr.error('กรุณาใส่ข้อมูลให้ครบ', 'Oops!',{toastLife: 5000,showCloseButton: true});
    }
    
  }
  gotoEdit(video: Video) {
    this.section = "edit";
    this.video = video;
  }

  delete(video:Video){
    this.videoService.delete(video).then(res=>{
      this.section = "index"
    })

  }
  update(video:Video){
    if(video.name!=''&&video.link!=''&&video.detail!=''&&video.category!=''){
      this.videoService.update(video).then(res=>{
        this.section = "index"
        this.video = { name: '', category: '', detail: '', link: '' };
      })
      this.toastr.success('บันทึกข้อมูลสำเร็จ', 'Success!',{toastLife: 3000, showCloseButton: true});
    }else{
      this.toastr.error('กรุณาใส่ข้อมูลให้ครบ', 'Oops!',{toastLife: 5000,showCloseButton: true});
    }
    

  }

}
