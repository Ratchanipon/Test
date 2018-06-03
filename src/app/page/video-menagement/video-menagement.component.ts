import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../service/video.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Video } from '../../model/video';
import { Project } from '../../model/project';
import { ProjectService } from '../../service/project.service';

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
    private angularFireAuth: AngularFireAuth) {

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

  save(video: Video) {
    this.videoService.save(video).then(res => {
      this.section = "index";
      this.video = { name: '', category: '', detail: '', link: '' };
    })
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
    this.videoService.update(video).then(res=>{
      this.section = "index"
      this.video = { name: '', category: '', detail: '', link: '' };
    })

  }

}
