import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';


// TODO? @ts-ignore
@NgModule({
  declarations: [ //components
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [ //modules
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [], //services, accessible to all parts of app
  bootstrap: [AppComponent]
})
export class AppModule { }
