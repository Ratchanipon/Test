import { Routes } from "@angular/router";
import { LoginComponent } from "./page/login/login.component";
import { UserMenagementComponent } from "./page/user-menagement/user-menagement.component";
import { VideoMenagementComponent } from "./page/video-menagement/video-menagement.component";
import { ProjectMenagementComponent } from "./page/project-menagement/project-menagement.component";
import { ActicleMenagementComponent } from "./page/acticle-menagement/acticle-menagement.component";
import { CategoryMenagementComponent } from "./page/category-menagement/category-menagement.component";


export const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'user', component:  UserMenagementComponent},
  { path:'project', component:  ProjectMenagementComponent},
  { path:'acticle', component:  ActicleMenagementComponent},
  { path:'video', component:  VideoMenagementComponent},
  { path:'category', component:  CategoryMenagementComponent},

];

