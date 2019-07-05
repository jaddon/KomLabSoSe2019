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
import { SingleChoiceComponent } from './program/singleChoice/singleChoice.component';
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

// Create Path Here
const routes: Routes = [
    {path: '', component: HomeComponent},
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
    {path: 'computerScience/modify1', component:Modify1Component},
    {path: 'computerScience/test1', component:Test1Component},
    {path: 'variable/modify3', component:Modify3Component},
    {path: 'variable/test3', component:Test3Component},
    {path: 'primitiveType/modify4', component: Modify4Component},    
    {path: 'primitiveType/test4', component: Test4Component},  
    {path: 'object/modify5', component: Modify5Component},
    {path: 'object/test5', component: Test5Component},
    {path: 'class/modify6', component: Modify6Component},
    {path: 'class/test6', component: Test6Component},
    {path: 'method/modify7', component: Modify7Component},
    {path: 'method/test7', component: Test7Component},





    {path: 'micro-basic', component: MicroMapBasicComponent},
    {path: 'program/singleChoice', component: SingleChoiceComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
