import { Routes } from "@angular/router";
import { LoginComponent } from "./page/login/login.component";
import { UserMenagementComponent } from "./page/user-menagement/user-menagement.component";


export const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'user', component:  UserMenagementComponent}
];

