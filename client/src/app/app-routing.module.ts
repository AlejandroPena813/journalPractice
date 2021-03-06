import { RouterModule, Routes } from "@angular/router";
import {NgModule} from "@angular/core";

import { HomeComponent} from "./components/home/home.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule] //routerModule ties to router-outlet selector in app.comp.html
})
export class AppRoutingModule { }
