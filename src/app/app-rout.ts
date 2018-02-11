import { Routes } from "@angular/router";
import { HeroesComponent } from "./page/heroes/heroes.component";
import { IronmarnComponent } from "./page/ironmarn/ironmarn.component";
import { ContentComponent } from "./page/content/content.component";


export const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'ironman', component: IronmarnComponent },
];