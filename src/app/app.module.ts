import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS } from '@angular/common/http';
<<<<<<< Updated upstream:src/app/app.module.ts
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> Stashed changes:app.module.ts

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';

import { AppRoutingModule } from './app-routing.module';
<<<<<<< Updated upstream:src/app/app.module.ts
import { ErrorInterceptor } from '@/helpers/error.interceptor';
import { JwtInterceptor } from '@/helpers/jwt.interceptor';
=======
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
>>>>>>> Stashed changes:app.module.ts
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ComputerScienceComponent } from './computerScience/computerScience.component';
import { HomeComponent } from './home/home.component';
import { MicroMapBasicComponent } from './micro-map-basic/micro-map-basic.component';
import { SingleChoiceComponent } from './test/singleChoice/singleChoice.component';
import { ProgramComponent } from './program/program.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Modify2Component } from './program/modify2/modify2.component';
import { Test2Component } from './program/test2/test2.component';
import { Modify1Component } from './computerScience/modify1/modify1.component';
import { Modify3Component } from './variable/modify3/modify3.component';
import { VariableComponent } from './variable/variable.component';
<<<<<<< Updated upstream:src/app/app.module.ts
=======
import { SingleChoiceComponent } from './program/singleChoice/singleChoice.component';
>>>>>>> Stashed changes:app.module.ts
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';
import { UserlistComponent } from './userlist/userlist.component';
import { LoginComponent } from './login/login.component';
<<<<<<< Updated upstream:src/app/app.module.ts
import { ClassmicromapComponent } from './classmicromap/classmicromap.component';

=======
//import { ClassmicromapComponent } from './classmicromap/classmicromap.component';
import { ModifyMapService } from './modifyMap.service';
import { BuildMapService } from './buildMap.service';
import { TestMapService } from './testMap.service';
import { Test1Component } from './computerScience/test1/test1.component';
import { Test3Component } from './variable/test3/test3.component';
import { ObjectComponent } from './object/object.component';
import { PrimitiveTypeComponent } from './primitive-type/primitive-type.component';
>>>>>>> Stashed changes:app.module.ts


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
<<<<<<< Updated upstream:src/app/app.module.ts
=======
	Test1Component,
    Test3Component,
    ObjectComponent,
    PrimitiveTypeComponent,
>>>>>>> Stashed changes:app.module.ts
    AlertComponent,
    RegisterComponent,
    UserlistComponent,
    LoginComponent,
<<<<<<< Updated upstream:src/app/app.module.ts
    ClassmicromapComponent,
=======
   // ClassmicromapComponent,
>>>>>>> Stashed changes:app.module.ts
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PdfViewerModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
<<<<<<< Updated upstream:src/app/app.module.ts
  providers: [
=======
  providers: [ BuildMapService, ModifyMapService, TestMapService,
>>>>>>> Stashed changes:app.module.ts
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
