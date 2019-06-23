import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import page
import { Page1Component } from './page1/page1.component';
import { HomeComponent } from './home/home.component';
import { MicroMapBasicComponent } from './micro-map-basic/micro-map-basic.component';
import { SingleChoiceComponent } from './test/singleChoice/singleChoice.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
// Create Path Here
const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'page1', component: Page1Component},
    {path: 'page2', component: Page2Component},
    {path: 'page3', component: Page3Component},
    {path: 'micro-basic', component: MicroMapBasicComponent},
    {path: 'test/singleChoice', component: SingleChoiceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }