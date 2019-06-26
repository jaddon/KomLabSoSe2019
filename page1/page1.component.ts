import { Component, ElementRef, ViewChild, OnInit, SimpleChanges, DoCheck } from '@angular/core';
import * as d3 from 'd3';
import {style} from '@angular/animations';
// import { svg } from 'd3';
import { BuildMapService } from '../buildMap.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  providers: [BuildMapService],
})
export class Page1Component implements OnInit{

  constructor(private buildMapService: BuildMapService, private router: Router){
  }

  ngOnInit(){
  }

  title = 'KomTest';

  @ViewChild('graphContainer', {static: true}) graphContainer: ElementRef;

  width = 1240;
  height = 480;
  k = 1;
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  clickOnNode = false;
  svg: any;
  circle: any;
  path: any;
  centered: any;
  centerx: any;
  centery: any;
  glossary: any;
  linkword: any;
  gText: any;
  gImage: any;
  sliderCircle: any;
  circleNextMap: any;
  toNextMapRect: any;
  routerLink: any;
  toNextMapButton: any;
 

  selectedNode = null;
  selectedLink = null;
  mousedownLink = null;
  mousedownNode = null;
  mouseupNode = null;

  // store the nodes
  nodes = [
    { id: 0, text: 'computer science', x: 300, y: 70, reflexive: true },
    { id: 1, text: 'algorithm', x: 210, y: 140, reflexive: true },
    { id: 2, text: 'programming', x: 350, y: 160, reflexive: true },
    { id: 3, text: 'problem solving', x: 120, y: 210, reflexive: true },
    { id: 4, text: 'low-level language', x: 270, y: 230, reflexive: true },
    { id: 5, text: 'high-level language', x: 410, y: 230, reflexive: true },
    { id: 6, text: 'debugging', x: 480, y: 210, reflexive: true },
    { id: 7, text: 'machine code', x: 230, y: 300, reflexive: false },
    { id: 8, text: 'source code', x: 420, y: 300, reflexive: false },
    { id: 9, text: 'bug', x: 550, y: 260, reflexive: false },
    { id: 10, text: 'logic error', x: 510, y: 320, reflexive: false },
    { id: 11, text: 'compile-time error', x: 670, y: 320, reflexive: false },
    { id: 12, text: 'run-time error', x: 590, y: 320, reflexive: false },
    { id: 13, text: 'intepreter', x: 340, y: 360, reflexive: false },
    { id: 14, text: 'compiler', x: 480, y: 360, reflexive: false },
  ];

  nodesNextMap = [
    
  ];

   // store the link words
   linkwords = [
     {id: 0, text: 'is science of', x: 255, y: 105, reflexive: false},
     {id: 1, text: 'for', x: 165, y: 175, reflexive: false},
     {id: 2, text: 'is about', x: 328, y: 120, reflexive: false},
     {id: 3, text: 'has', x: 350, y: 195, reflexive: false},
     {id: 4, text: 'uses', x: 415, y: 185, reflexive: false},
     {id: 5, text: 'is called', x: 250, y: 265, reflexive: false},
     {id: 6, text: 'is called', x: 415, y: 265, reflexive: false},
     {id: 7, text: 'to find', x: 515, y: 235, reflexive: false},
     {id: 8, text: 'in', x: 485, y: 280, reflexive: false},
     {id: 9, text: 'includes', x: 570, y: 290, reflexive: false},
     {id: 10, text: 'into', x: 285, y: 330, reflexive: false},
     {id: 11, text: 'is translated with', x: 410, y: 335, reflexive: false},
   ];

  // store the links
  links = [
    { source: this.nodes[0], target: this.linkwords[0], left: false, right: false },
    { source: this.linkwords[0], target: this.nodes[1], left: false, right: true },
    { source: this.nodes[1], target: this.linkwords[1], left: false, right: false },
    { source: this.linkwords[1], target: this.nodes[3], left: false, right: true },
    { source: this.nodes[0], target: this.linkwords[2], left: false, right: false },
    { source: this.linkwords[2], target: this.nodes[2], left: false, right: true },
    { source: this.nodes[2], target: this.linkwords[3], left: false, right: false },
    { source: this.linkwords[3], target: this.nodes[4], left: false, right: true },
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

  // store the white rectangulars as simulation for text fields
  glossaries = [
    { target: this.nodes[0], hidden: true, width: 60, height: 80},
    { target: this.nodes[1], hidden: true, width: 60, height: 80},
    { target: this.nodes[2], hidden: true, width: 60, height: 80},
    { target: this.nodes[3], hidden: true, width: 60, height: 80},
    { target: this.nodes[4], hidden: true, width: 60, height: 80},
    { target: this.nodes[5], hidden: true, width: 60, height: 80},
    { target: this.nodes[6], hidden: true, width: 60, height: 80},
    { target: this.nodes[7], hidden: true, width: 60, height: 80},
    { target: this.nodes[8], hidden: true, width: 60, height: 80},
    { target: this.nodes[9], hidden: true, width: 60, height: 80},
    { target: this.nodes[10], hidden: true, width: 60, height: 80},
    { target: this.nodes[11], hidden: true, width: 60, height: 80},
    { target: this.nodes[12], hidden: true, width: 60, height: 80},
    { target: this.nodes[13], hidden: true, width: 60, height: 80},
    { target: this.nodes[14], hidden: true, width: 60, height: 80},
  ];

  gTexts = [
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[0], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[1], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[2], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[3], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[4], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[5], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[6], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[7], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[8], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[9], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[10], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[11], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[12], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[13], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[14], hidden: true},
  ];


  ngAfterContentInit() {

    
    // document.getElementById('slider').style.color = 'black';
    
    // (<HTMLInputElement>document.getElementById('slider')).onchange = this.restart;


  var svgArray = this.buildMapService.initSvg(this.svg, this.width, this.height, this.path, this.circle, this.linkword, this.glossary, this.gText, this.gImage, this.sliderCircle, this.nodesNextMap, this.toNextMapRect, this.linkwords, this.toNextMapButton);

  //  this.svg = this.buildMapService.initSvg(this.svg, this.width, this.height)
  this.svg = svgArray[0];
  // add the svg<g> element to group svg shapes together  
  this.path = svgArray[1];
  this.circle = svgArray[2];
  this.linkword = svgArray[3];
  this.glossary = svgArray[4];
  this.gText = svgArray[5];
  this.gImage = svgArray[6];
  this.sliderCircle = svgArray[7];
  this.circleNextMap = svgArray[8];
  this.toNextMapRect = svgArray[9];




// refresh after each mousedown and mouseup
    this.svg.on('mousedown', (dataItem, value, source) => this.mousedown(dataItem, value, source));
    this.restart();
    this.svg.on('mouseup', (dataItem) => this.mouseup(dataItem));
    this.restart();

  }

  mousedown(dataItem: any, value: any, source: any) {
    // when mouse down set this.svg as active
    this.svg.classed('active', true);
    

    if (this.svg.attr('clickOnNode')==='false') {
        // if click on the same node once again or click on the background, then not zooming
         this.centered = null;
         this.selectedNode = null;
         this.centerx = this.width / 2;
         this.centery = this.height / 2;
         this.k = 1;


         
         this.svg.transition()
        .duration(750)
        .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')scale(' + this.k + ')translate(' + -this.centerx + ',' + -this.centery + ')');
        //  console.log('this is my : ' + this.selectedNode );

        this.svg.selectAll('rect.gRect').attr('visibility','hidden');
        this.svg.selectAll('text.gText').attr('visibility','hidden');
        this.svg.selectAll('image.gImage').attr('visibility','hidden');
        this.restart();

    }

    this.restart();
  }

  mouseup(source: any) {
    // when mouseup, set the svg background as inactive
    this.svg.classed('active', false);

    // clear mouse event vars
    // this.mousedownNode = null;
    // this.mouseupNode = null;
    // this.mousedownLink = null;
    // this.clickOnNode = false;

    this.svg.attr('clickOnNode','false');


    // remove all white rectangulars and their contents when the scale is 1
    if (this.k === 1) {
      // this.svg.selectAll('rect').remove();
      // this.svg.selectAll('text.gText').remove();
      // this.svg.selectAll('image.gImage').remove();
    }
}


// refresh function
  restart() {  
var buildMap = this.buildMapService.buildMicroMap(this.svg, this.path, this.links, this.glossary, this.glossaries, this.gText, this.gTexts, this.gImage, this.circle, this.nodes, this.linkword, this.linkwords, this.sliderCircle, this.nodesNextMap, this.circleNextMap, 0);

this.svg  = buildMap[0];

this.circle = buildMap[1];
this.circle.merge(this.circle);
this.path = buildMap[2];
this.path.merge(this.path);
this.glossary = buildMap[3];
this.glossary.merge(this.glossary);
this.gText = buildMap[4];
this.gText.merge(this.gText);
this.gImage = buildMap[5];
this.gImage.merge(this.gImage);
this.linkword = buildMap[6];
this.linkword.merge(this.linkword);

this.routerLink = buildMap[8];
console.log(this.routerLink);




this.router.navigate[this.routerLink];
  }
}

