import { NgModule, Component } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import page
import { HomeComponent } from './home/home.component';
import { MicroMapBasicComponent } from './micro-map-basic/micro-map-basic.component';
import { SingleChoiceComponent } from './test/singleChoice/singleChoice.component';
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
<<<<<<< Updated upstream:src/app/app-routing.module.ts
=======
import { SingleChoiceComponent } from './program/singleChoice/singleChoice.component';
import { Test3Component } from './variable/test3/test3.component';
import { Test1Component } from './computerScience/test1/test1.component';
import { ObjectComponent } from './object/object.component';
import { PrimitiveTypeComponent } from './primitive-type/primitive-type.component';
>>>>>>> Stashed changes:app-routing.module.ts

// Create Path Here
const routes: Routes = [

    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: 'home', component: HomeComponent},
    {path: 'computerScience', component: ComputerScienceComponent},
    {path: 'program', component: ProgramComponent},
<<<<<<< Updated upstream:src/app/app-routing.module.ts
=======
	{path: 'variable', component: VariableComponent},
	{path: 'object', component: ObjectComponent},
    {path: 'primitiveType', component: PrimitiveTypeComponent},
>>>>>>> Stashed changes:app-routing.module.ts
    // don't use children here because svg will be covered by the parent svg
    // children: [
    //   {
    //     path: 'modify2', component: Modify2Component
    //   }]
    {path: 'program/modify2', component: Modify2Component},
    {path: 'program/test2', component: Test2Component},
    {path: 'computerScience/modify1', component: Modify1Component},
<<<<<<< Updated upstream:src/app/app-routing.module.ts
    {path: 'variable/modify3', component: Modify3Component},


    {path: 'variable', component: VariableComponent},
    {path: 'micro-basic', component: MicroMapBasicComponent},
    {path: 'test/singleChoice', component: SingleChoiceComponent},
=======
	{path: 'computerScience/test1', component:Test1Component},
    {path: 'variable/modify3', component: Modify3Component},
	{path: 'variable/test3', component:Test3Component}, 
    {path: 'micro-basic', component: MicroMapBasicComponent},
    {path: 'program/singleChoice', component: SingleChoiceComponent},
>>>>>>> Stashed changes:app-routing.module.ts
    // otherwise redirect to home
    { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
