import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { BooksComponent } from './components/books/books.component';
import { BasketComponent } from './components/basket/basket.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddbookComponent } from './components/addbook/addbook.component';


import { AppRoutingModule , routingComponents } from './AppRoutingModule';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { MybookComponent } from './components/mybook/mybook.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    AddbookComponent,
    BooksComponent,
    BasketComponent,
    HomepageComponent,
    routingComponents,
    RegisterComponent,
    MybookComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
