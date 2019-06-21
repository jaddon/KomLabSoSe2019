import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {style} from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private router: Router){

  }


  ngOnInit(){
    
  }
}
