import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthService } from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";


// TODO? @ts-ignore
@NgModule({
  declarations: [ //components, directives, pipes. exports[] are these same comp but for other modules
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent
  ],
  imports: [ //modules
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ AuthService ], //services, accessible to all parts of app or specific module
  bootstrap: [AppComponent]
})
export class AppModule { }
