import { NgModule, Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import page
import { HomeComponent } from './home/home.component';
import { MicroMapBasicComponent } from './micro-map-basic/micro-map-basic.component';
import { Modify2Component } from './program/modify2/modify2.component';
import { Test2Component } from './program/test2/test2.component';
import { Modify1Component } from './computerScience/modify1/modify1.component';
import { Modify3Component } from './variable/modify3/modify3.component';
import { VariableComponent } from './variable/variable.component';
import { ComputerScienceComponent } from './computerScience/computerScience.component';
import { ProgramComponent } from './program/program.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { Test3Component } from './variable/test3/test3.component';
import { Test1Component } from './computerScience/test1/test1.component';
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
import { UserlistComponent } from './userlist/userlist.component';
import { BooklistComponent } from './booklist/booklist.component';
import {Singlechoicetest1Component} from './computerScience/singlechoicetest1/singlechoicetest1.component';
import {SingleChoiceTest2Component} from './program/single-choice-test2/single-choice-test2.component';
import {Singlechoicetest3Component} from './variable/singlechoicetest3/singlechoicetest3.component';
import {Singlechoicetest4Component} from './primitive-type/singlechoicetest4/singlechoicetest4.component';
import {Singlechoicetest5Component} from './object/singlechoicetest5/singlechoicetest5.component';
import {Singlechoicetest6Component} from './class/singlechoicetest6/singlechoicetest6.component';
import {Singlechoicetest7Component} from './method/singlechoicetest7/singlechoicetest7.component';

// Create Path Here
const routes: Routes = [

    {path: '', component: BooklistComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'home', component: HomeComponent},
    {path: 'computerScience', component: ComputerScienceComponent},
    {path: 'program', component: ProgramComponent},
	{path: 'variable', component: VariableComponent},
	{path: 'object', component: ObjectComponent},
	{path: 'primitiveType', component: PrimitiveTypeComponent},
	{path: 'class', component: ClassComponent},
	{path: 'method', component: MethodComponent},
    // don't use children here because svg will be covered by the parent svg
    // children: [
    //   {
    //     path: 'modify2', component: Modify2Component
    //   }]
    {path: 'program/modify2', component: Modify2Component},
	{path: 'program/test2', component: Test2Component},
	{path: 'program/single-choice-test2', component: SingleChoiceTest2Component},
    {path: 'computerScience/modify1', component: Modify1Component},
	{path: 'computerScience/test1', component:Test1Component},
	{path: 'computerScience/singlechoicetest1', component: Singlechoicetest1Component},
    {path: 'variable/modify3', component: Modify3Component},
	{path: 'variable/test3', component:Test3Component},
	{path: 'variable/singlechoicetest3', component:Singlechoicetest3Component},
	{path: 'primitiveType/modify4', component: Modify4Component},
	{path: 'primitiveType/test4', component: Test4Component},
	{path: 'primitiveType/singlechoicetest4', component: Singlechoicetest4Component},
    {path: 'object/modify5', component: Modify5Component},
	{path: 'object/test5', component: Test5Component},
	{path: 'object/singlechoicetest5', component: Singlechoicetest5Component},
    {path: 'class/modify6', component: Modify6Component},
	{path: 'class/test6', component: Test6Component},
	{path: 'class/singlechoicetest6', component: Singlechoicetest6Component},
    {path: 'method/modify7', component: Modify7Component},
	{path: 'method/test7', component: Test7Component},
	{path: 'method/singlechoicetest7', component: Singlechoicetest7Component},
    {path: 'micro-basic', component: MicroMapBasicComponent},
	{path: 'userlist', component: UserlistComponent},
	{path: 'booklist', component: BooklistComponent},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
