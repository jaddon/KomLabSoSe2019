import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Page1Component } from './page1/page1.component';
import { HomeComponent } from './home/home.component';
import { MicroMapBasicComponent } from './micro-map-basic/micro-map-basic.component';
import { SingleChoiceComponent } from './test/singleChoice/singleChoice.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Modify2Component } from './page2/modify2/modify2.component';
import { Test2Component } from './page2/test2/test2.component';
import { Modify1Component } from './page1/modify1/modify1.component';
import { Modify3Component } from './page3/modify3/modify3.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page1Component,
    HomeComponent,
    MicroMapBasicComponent,
    SingleChoiceComponent,
    Page2Component,
    Page3Component,
    Modify2Component,
    Test2Component,
    Modify1Component,
    Modify3Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PdfViewerModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
