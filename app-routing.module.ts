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

// Create Path Here
const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'computerScience', component: ComputerScienceComponent},
    {path: 'program', component: ProgramComponent}, 
    // don't use children here because svg will be covered by the parent svg
    // children: [
    //   {
    //     path: 'modify2', component: Modify2Component
    //   }]
    {path: 'program/modify2', component: Modify2Component},
    {path: 'program/test2', component: Test2Component},
    {path: 'computerScience/modify1', component:Modify1Component},
    {path: 'variable/modify3', component:Modify3Component},

    
    {path: 'variable', component: VariableComponent},
    {path: 'micro-basic', component: MicroMapBasicComponent},
    {path: 'program/singleChoice', component: SingleChoiceComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
