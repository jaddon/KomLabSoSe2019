import { Component, ElementRef, ViewChild, OnInit, SimpleChanges, DoCheck } from '@angular/core';
import * as d3 from 'd3';
import {style} from '@angular/animations';
// import { svg } from 'd3';
import { BuildMapService } from '../buildMap.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css'],
  providers: [BuildMapService],
})
export class Page3Component implements OnInit{

  constructor(private buildMapService: BuildMapService, private router: Router){
  }

  ngOnInit(){
  }

  title = 'KomTest';

  @ViewChild('graphContainer') graphContainer: ElementRef;

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
    { id: 0, text: 'value', x: 870, y: 100, reflexive: false },
    { id: 1, text: 'variable', x: 1130, y: 300, reflexive: false },
    { id: 2, text: 'constant', x: 930, y: 300, reflexive: false },
    { id: 3, text: 'instance variable', x: 980, y: 380, reflexive: false },
    { id: 4, text: 'local variable', x: 1100, y: 380, reflexive: false },
    { id: 5, text: 'class variable', x: 1200, y: 380, reflexive: false },
  ];

  nodesNextMap = [
    { id: 0, text: 'initialization', x: 490, y: 200, reflexive: true },
    { id: 1, text: 'print statement', x: 620, y: 200, reflexive: true },
    { id: 2, text: 'output', x: 590, y: 300, reflexive: false },
    { id: 3, text: 'System class', x: 590, y: 380, reflexive: false },
  ];

   // store the link words
   linkwords = [
    {id: 0, text: 'into', x: 950, y: 160, reflexive: false},
    {id: 1, text: 'declared with final type', x: 1025, y: 300, reflexive: false},
    {id: 2, text: 'has type', x: 1100, y: 340, reflexive: false},

    {id: 3, text: 'put', x: 350, y: 100, reflexive: false},
    {id: 4, text: 'put first', x: 480, y: 140, reflexive: false},
    {id: 5, text: 'create', x: 680, y: 160, reflexive: false},
    {id: 6, text: 'shows', x: 605, y: 250, reflexive: false},
   ];

  // store the links
  links = [
    { source: this.nodes[0], target: this.linkwords[0], left: false, right: false },
    { source: this.linkwords[0], target: this.nodes[1], left: false, right: true },
    { source: this.nodes[1], target: this.linkwords[1], left: false, right: false },
    { source: this.linkwords[1], target: this.nodes[2], left: false, right: true },
    { source: this.nodes[1], target: this.linkwords[2], left: false, right: false },
    { source: this.linkwords[2], target: this.nodes[3], left: false, right: true },
    { source: this.linkwords[2], target: this.nodes[4], left: false, right: true },
    { source: this.linkwords[2], target: this.nodes[5], left: false, right: true }, 

    { source: this.nodesNextMap[0], target: this.linkwords[5], left: false, right: false },
    { source: this.linkwords[5], target: this.nodes[1], left: false, right: true }, 
    { source: this.linkwords[3], target: this.nodes[0], left: false, right: true }, 
    { source: this.linkwords[4], target: this.nodes[0], left: false, right: true },
    { source: this.nodesNextMap[1], target: this.linkwords[6], left: false, right: false },  
    { source: this.linkwords[6], target: this.nodesNextMap[2], left: false, right: true },
   

  ];

  // store the white rectangulars as simulation for text fields
  glossaries = [
    { target: this.nodes[0], hidden: true, width: 60, height: 80},
    { target: this.nodes[1], hidden: true, width: 60, height: 80},
    { target: this.nodes[2], hidden: true, width: 60, height: 80},
    { target: this.nodes[3], hidden: true, width: 60, height: 80},
    { target: this.nodes[4], hidden: true, width: 60, height: 80},
    { target: this.nodes[5], hidden: true, width: 60, height: 80},
    // { target: this.nodes[6], hidden: true, width: 60, height: 80},
    // { target: this.nodes[7], hidden: true, width: 60, height: 80},
    // { target: this.nodes[8], hidden: true, width: 60, height: 80},
    // { target: this.nodes[9], hidden: true, width: 60, height: 80},
    // { target: this.nodes[10], hidden: true, width: 60, height: 80},
    // { target: this.nodes[11], hidden: true, width: 60, height: 80},
    // { target: this.nodes[12], hidden: true, width: 60, height: 80},
    // { target: this.nodes[13], hidden: true, width: 60, height: 80},
    // { target: this.nodes[14], hidden: true, width: 60, height: 80},
  ];

  gTexts = [
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[0], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[1], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[2], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[3], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[4], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[5], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[6], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[7], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[8], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[9], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[10], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[11], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[12], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[13], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[14], hidden: true},
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

var offset = 600;

var buildMap = this.buildMapService.buildMicroMap(this.svg, this.path, this.links, this.glossary, this.glossaries, this.gText, this.gTexts, this.gImage, this.circle, this.nodes, this.linkword, this.linkwords, this.sliderCircle, this.nodesNextMap, this.circleNextMap, offset);

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
this.circleNextMap = buildMap[7];
this.circleNextMap.merge(this.circleNextMap);


this.routerLink = buildMap[8];
// console.log(this.routerLink);

this.svg.selectAll('ellipse').transition()
.duration(0)
.attr('transform', 'translate(' + -600  + ',' + 0 + ')');
this.svg.selectAll('text.eText').transition()
.duration(0)
.attr('transform', 'translate(' + -600  + ',' + 0 + ')');
this.svg.selectAll('text.linkword').transition()
.duration(0)
.attr('transform', 'translate(' + -600  + ',' + 0 + ')');
this.svg.selectAll('path.link').transition()
.duration(0)
.attr('transform', 'translate(' + -600  + ',' + 0 + ')');
this.svg.selectAll('ellipse.linkword').transition()
.duration(0)
.attr('transform', 'translate(' + -600  + ',' + 0 + ')');
this.svg.selectAll('rect.gRect').transition()
.duration(0)
.attr('transform', 'translate(' + -600  + ',' + 0 + ')');
this.svg.selectAll('text.gText').transition()
.duration(0)
.attr('transform', 'translate(' + -600  + ',' + 0 + ')');
this.svg.selectAll('image.gImage').transition()
.duration(0)
.attr('transform', 'translate(' + -600  + ',' + 0 + ')');
this.svg.selectAll('text.eTextNextMap').transition()
  .duration(0)
  .attr('transform', 'translate(' + -600  + ',' + 0 + ')');


this.routerLink = buildMap[8];
console.log(this.routerLink);

  }
}


