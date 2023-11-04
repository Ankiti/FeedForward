import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeListComponent } from './home-list/home-list.component';
import { NewListComponent } from './new-list/new-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeListComponent,
    NewListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';

