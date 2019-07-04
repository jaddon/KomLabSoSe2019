import { Component, OnInit, ElementRef, ViewChild, } from '@angular/core';
import * as d3 from 'd3';
import {style} from '@angular/animations';

@Component({
  selector: 'app-classmicromap',
  templateUrl: './classmicromap.component.html',
  styleUrls: ['./classmicromap.component.css']
})
export class ClassmicromapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   title = 'Class Micro Map';

  @ViewChild('graphContainer', {static: true}) graphContainer: ElementRef;

  width = 1240;
  height = 570;
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  svg: any;
  circle: any;
  path: any;
  linkword: any;

  // store the nodes
   nodes = [
    { id: 0, text: 'class', x: 300, y: 70, reflexive: true },
    { id: 1, text: 'package', x: 210, y: 140, reflexive: true },
    { id: 2, text: 'comment', x: 350, y: 160, reflexive: true },
    { id: 3, text: 'composition', x: 120, y: 210, reflexive: true },
    { id: 4, text: 'inheritance', x: 270, y: 230, reflexive: true },
    { id: 5, text: 'java library', x: 410, y: 230, reflexive: true },
    { id: 6, text: 'tag', x: 480, y: 210, reflexive: true },
	{ id: 7, text: 'Java Doc', x: 230, y: 300, reflexive: true },
	{ id: 8, text: 'object', x: 485, y: 280, reflexive: true },
  ]; //Object is from other map

   // store the link words
   linkwords = [
     {id: 0, text: 'is template of', x: 255, y: 105, reflexive: false},
     {id: 1, text: 'forms', x: 165, y: 175, reflexive: false},
     {id: 2, text: 'can have', x: 328, y: 120, reflexive: false},
     {id: 3, text: 'can be from', x: 350, y: 195, reflexive: false},
     {id: 4, text: 'has type of relationships', x: 415, y: 185, reflexive: false},
     {id: 5, text: 'begin with', x: 250, y: 265, reflexive: false},
     {id: 6, text: 'organized by', x: 415, y: 265, reflexive: false},
   ];
     // store the links
  links = [
    { source: this.nodes[0], target: this.linkwords[0], left: false, right: false },
    { source: this.linkwords[0], target: this.nodes[8], left: false, right: true },
    { source: this.nodes[1], target: this.linkwords[1], left: false, right: false },
    { source: this.linkwords[1], target: this.nodes[1], left: false, right: true },
    { source: this.nodes[0], target: this.linkwords[2], left: false, right: false },
    { source: this.linkwords[2], target: this.nodes[2], left: false, right: true },
    { source: this.nodes[0], target: this.linkwords[3], left: false, right: false },
    { source: this.linkwords[3], target: this.nodes[5], left: false, right: true },
    { source: this.linkwords[3], target: this.nodes[5], left: false, right: true },
    { source: this.nodes[2], target: this.linkwords[4], left: false, right: false },
    { source: this.linkwords[4], target: this.nodes[6], left: false, right: true },
    { source: this.nodes[4], target: this.linkwords[5], left: false, right: false },
    { source: this.linkwords[5], target: this.nodes[7], left: false, right: true },
    { source: this.nodes[5], target: this.linkwords[6], left: false, right: false },
    { source: this.linkwords[6], target: this.nodes[8], left: false, right: true },
    { source: this.nodes[6], target: this.linkwords[7], left: false, right: false },
    { source: this.linkwords[7], target: this.nodes[9], left: false, right: true },
    { source: this.nodes[9], target: this.linkwords[8], left: false, right: false },
    { source: this.linkwords[8], target: this.nodes[8], left: false, right: true },
    { source: this.nodes[9], target: this.linkwords[9], left: false, right: false },
    { source: this.linkwords[9], target: this.nodes[10], left: false, right: true },
    { source: this.linkwords[9], target: this.nodes[11], left: false, right: true },
    { source: this.linkwords[9], target: this.nodes[12], left: false, right: true },
    { source: this.nodes[13], target: this.linkwords[10], left: false, right: false },
    { source: this.linkwords[10], target: this.nodes[7], left: false, right: true },
    { source: this.nodes[8], target: this.linkwords[11], left: false, right: false },
    { source: this.linkwords[11], target: this.nodes[13], left: false, right: true },
    { source: this.linkwords[11], target: this.nodes[14], left: false, right: true },
  ];

}
