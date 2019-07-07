import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './helpers/fake-backend';

import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
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
import { VariableComponent } from './variable/variable.component';
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';
import { UserlistComponent } from './userlist/userlist.component';
import { LoginComponent } from './login/login.component';
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
import { BooklistComponent } from './booklist/booklist.component';
import { SingleChoiceTest2Component } from './program/single-choice-test2/single-choice-test2.component';
import { Singlechoicetest1Component } from './computerScience/singlechoicetest1/singlechoicetest1.component';
import { Singlechoicetest3Component } from './variable/singlechoicetest3/singlechoicetest3.component';
import { Singlechoicetest4Component } from './primitive-type/singlechoicetest4/singlechoicetest4.component';
import { Singlechoicetest5Component } from './object/singlechoicetest5/singlechoicetest5.component';
import { Singlechoicetest6Component } from './class/singlechoicetest6/singlechoicetest6.component';
import { Singlechoicetest7Component } from './method/singlechoicetest7/singlechoicetest7.component';


@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		ComputerScienceComponent,
		HomeComponent,
		MicroMapBasicComponent,
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
		AlertComponent,
		RegisterComponent,
		UserlistComponent,
		LoginComponent,
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
		BooklistComponent,
		SingleChoiceTest2Component,
    		Singlechoicetest1Component,
    		Singlechoicetest3Component,
    		Singlechoicetest4Component,
    		Singlechoicetest5Component,
    		Singlechoicetest6Component,
    		Singlechoicetest7Component,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		PdfViewerModule,
		HttpClientModule,
		ReactiveFormsModule,
	],
	providers: [BuildMapService, ModifyMapService, TestMapService,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

		// provider used to create fake backend
		fakeBackendProvider
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
