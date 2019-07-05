import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ComputerScienceComponent } from './computerScience/computerScience.component';
import { HomeComponent } from './home/home.component';
import { MicroMapBasicComponent } from './micro-map-basic/micro-map-basic.component';
import { ProgramComponent } from './program/program.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Modify2Component } from './program/modify2/modify2.component';
import { Test2Component } from './program/test2/test2.component';
import { Modify1Component } from './computerScience/modify1/modify1.component';
import { Modify3Component } from './variable/modify3/modify3.component';
import { HttpClientModule } from '@angular/common/http';
import { VariableComponent } from './variable/variable.component';
import { SingleChoiceComponent } from './program/singleChoice/singleChoice.component';
import { ModifyMapService } from './modifyMap.service';
import { BuildMapService } from './buildMap.service';
import { TestMapService } from './testMap.service';
import { Test1Component } from './computerScience/test1/test1.component';
import { Test3Component } from './variable/test3/test3.component';
import { ObjectComponent } from './object/object.component';
import { PrimitiveTypeComponent } from './primitive-type/primitive-type.component';
import { Modify4Component } from './primitive-type/modify4/modify4.component';
import { Test4Component } from './primitive-type/test4/test4.component';
import { Modify5Component } from './object/modify5/modify5.component';
import { Test5Component } from './object/test5/test5.component';
import { ClassComponent } from './class/class.component';
import { MethodComponent } from './method/method.component';
import { Modify6Component } from './class/modify6/modify6.component';
import { Test6Component } from './class/test6/test6.component';
import { Modify7Component } from './method/modify7/modify7.component';
import { Test7Component } from './method/test7/test7.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ComputerScienceComponent,
    HomeComponent,
    MicroMapBasicComponent,
    SingleChoiceComponent,
    ProgramComponent,
    VariableComponent,
    Modify2Component,
    Test2Component,
    Modify1Component,
    Modify3Component,
    Test1Component,
    Test3Component,
    ObjectComponent,
    PrimitiveTypeComponent,
    Modify4Component,
    Test4Component,
    Modify5Component,
    Test5Component,
    ClassComponent,
    MethodComponent,
    Modify6Component,
    Test6Component,
    Modify7Component,
    Test7Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PdfViewerModule,
    HttpClientModule
    
  ],
  providers: [BuildMapService, ModifyMapService, TestMapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
