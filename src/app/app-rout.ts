import { Routes } from "@angular/router";
import { HeroesComponent } from "./page/heroes/heroes.component";
import { IronmarnComponent } from "./page/ironmarn/ironmarn.component";
import { ContentComponent } from "./page/content/content.component";
import { UserComponent } from "./page/user/user.component";
import { LoginComponent } from "./page/login/login.component";
import { ApproverComponent } from "./page/approver/approver.component";
import { EditApproverComponent } from "./page/edit-approver/edit-approver.component";
import { PersonalComponent } from "./page/personal/personal.component";
import { ApprovePersonalComponent } from "./page/approve-personal/approve-personal.component";


export const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'user', component: UserComponent },
  { path:'approver', component: ApproverComponent },
  { path:'approver-edit', component: EditApproverComponent },
  { path:'personal', component: PersonalComponent },
  { path:'view-personal', component: ApprovePersonalComponent },
];

