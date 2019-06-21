import { Component, ElementRef, ViewChild, OnInit, SimpleChanges, DoCheck } from '@angular/core';
import * as d3 from 'd3';
import {style} from '@angular/animations';
// import { svg } from 'd3';
import { BuildMapService } from '../buildMap.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  providers: [BuildMapService],
})
export class Page2Component implements OnInit{

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
    { id: 0, text: 'program', x: 400, y: 70, reflexive: true },
    { id: 1, text: 'statement', x: 400, y: 140, reflexive: true },
    { id: 2, text: 'conditional statement', x: 200, y: 160, reflexive: true },
    { id: 3, text: 'chaining', x: 100, y: 140, reflexive: true },
    { id: 4, text: 'nesting', x: 70, y: 180, reflexive: true },
    { id: 5, text: 'relational operator', x: 150, y: 220, reflexive: true },
    { id: 6, text: 'logical operator', x: 250, y: 220, reflexive: true },
    { id: 7, text: 'assignment', x: 310, y: 200, reflexive: true },
    { id: 8, text: 'declaration', x: 400, y: 200, reflexive: true },
    { id: 9, text: 'initialization', x: 490, y: 200, reflexive: true },
    { id: 10, text: 'print statement', x: 620, y: 200, reflexive: true },
    { id: 11, text: 'input', x: 520, y: 300, reflexive: false },
    { id: 12, text: 'output', x: 590, y: 300, reflexive: false },
    { id: 13, text: 'Scanner class', x: 450, y: 380, reflexive: false },
    { id: 14, text: 'System class', x: 590, y: 380, reflexive: false },
    { id: 15, text: 'loop', x: 280, y: 330, reflexive: false },
    { id: 16, text: 'loop body', x: 180, y: 360, reflexive: false },
    { id: 17, text: 'loop variable', x: 240, y: 380, reflexive: false },
    { id: 18, text: 'increment loop', x: 290, y: 420, reflexive: false },
    { id: 19, text: 'pretest loop', x: 360, y: 420, reflexive: false },
    { id: 20, text: 'posttest loop', x: 430, y: 420, reflexive: false },
    // { id: 21, text: 'value', x: 620, y: 100, reflexive: false },
    // { id: 22, text: 'variable', x: 750, y: 150, reflexive: false },
  ];

  nodesNextMap = [
    { id: 0, text: 'value', x: 870, y: 100, reflexive: false },
    { id: 1, text: 'variable', x: 1130, y: 300, reflexive: false },
    { id: 2, text: 'constant', x: 930, y: 300, reflexive: false },
    { id: 3, text: 'instance variable', x: 980, y: 380, reflexive: false },
    { id: 4, text: 'local variable', x: 1100, y: 380, reflexive: false },
    { id: 5, text: 'class variable', x: 1200, y: 380, reflexive: false },
    
  ];


   // store the link words
   linkwords = [
     {id: 0, text: 'has', x: 400, y: 100, reflexive: false},
     {id: 1, text: 'put', x: 350, y: 100, reflexive: false},
     {id: 2, text: 'has type', x: 400, y: 165, reflexive: false},
     {id: 3, text: 'has', x: 150, y: 150, reflexive: false},
     {id: 4, text: 'may use', x: 135, y: 170, reflexive: false},
     {id: 5, text: 'can have', x: 210, y: 190, reflexive: false},
     {id: 6, text: 'put first', x: 480, y: 140, reflexive: false},
     {id: 7, text: 'has', x: 550, y: 160, reflexive: false},
     {id: 8, text: 'create', x: 680, y: 160, reflexive: false},
     {id: 9, text: 'shows', x: 605, y: 250, reflexive: false},
     {id: 10, text: 'by', x: 510, y: 340, reflexive: false},
     {id: 11, text: 'by', x: 590, y: 340, reflexive: false},
     {id: 12, text: 'contains', x: 230, y: 345, reflexive: false},
     {id: 13, text: 'has type', x: 300, y: 380, reflexive: false},
     {id: 14, text: 'can be repeated in', x: 330, y: 270, reflexive: false},
     {id: 15, text: 'into', x: 950, y: 160, reflexive: false},
     {id: 16, text: 'declared with final type', x: 1025, y: 300, reflexive: false},
     {id: 17, text: 'has type', x: 1100, y: 340, reflexive: false},
   ];

  // store the links
  links = [
    { source: this.nodes[0], target: this.linkwords[0], left: false, right: false },
    { source: this.nodes[0], target: this.linkwords[7], left: false, right: false },
    { source: this.linkwords[0], target: this.nodes[1], left: false, right: true },
    { source: this.nodes[1], target: this.linkwords[2], left: false, right: false },
    { source: this.linkwords[2], target: this.nodes[7], left: false, right: true },
    { source: this.linkwords[2], target: this.nodes[8], left: false, right: true },
    { source: this.linkwords[2], target: this.nodes[9], left: false, right: true },
    { source: this.linkwords[2], target: this.nodes[10], left: false, right: true },
    { source: this.nodes[2], target: this.linkwords[3], left: false, right: false },
    { source: this.nodes[2], target: this.linkwords[4], left: false, right: false },
    { source: this.nodes[2], target: this.linkwords[5], left: false, right: false },
    { source: this.linkwords[3], target: this.nodes[3], left: false, right: true },
    { source: this.linkwords[4], target: this.nodes[4], left: false, right: true },
    { source: this.linkwords[5], target: this.nodes[5], left: false, right: true },
    { source: this.linkwords[5], target: this.nodes[6], left: false, right: true },
    { source: this.nodes[7], target: this.linkwords[1], left: false, right: false },
    { source: this.nodes[8], target: this.linkwords[6], left: false, right: false },
    { source: this.nodes[9], target: this.linkwords[8], left: false, right: false },
    { source: this.linkwords[7], target: this.nodes[11], left: false, right: true },
    { source: this.linkwords[7], target: this.nodes[12], left: false, right: true },
    { source: this.nodes[12], target: this.linkwords[9], left: false, right: false },
    { source: this.linkwords[9], target: this.nodes[10], left: false, right: true },
    { source: this.nodes[11], target: this.linkwords[10], left: false, right: false },
    { source: this.linkwords[10], target: this.nodes[13], left: false, right: true },
    { source: this.nodes[12], target: this.linkwords[11], left: false, right: false },
    { source: this.linkwords[11], target: this.nodes[14], left: false, right: true },
    { source: this.nodes[1], target: this.linkwords[14], left: false, right: false },
    { source: this.linkwords[14], target: this.nodes[15], left: false, right: true },
    { source: this.nodes[15], target: this.linkwords[12], left: false, right: false },
    { source: this.nodes[15], target: this.linkwords[13], left: false, right: false },
    { source: this.linkwords[12], target: this.nodes[16], left: false, right: true },
    { source: this.linkwords[12], target: this.nodes[17], left: false, right: true },
    { source: this.linkwords[13], target: this.nodes[18], left: false, right: true },
    { source: this.linkwords[13], target: this.nodes[19], left: false, right: true },
    { source: this.linkwords[13], target: this.nodes[20], left: false, right: true },

    { source: this.linkwords[1], target: this.nodesNextMap[0], left: false, right: true },
    { source: this.linkwords[6], target: this.nodesNextMap[0], left: false, right: true },
    { source: this.linkwords[8], target: this.nodesNextMap[1], left: false, right: true },
    { source: this.nodesNextMap[0], target: this.linkwords[15], left: false, right: false },
    { source: this.linkwords[15], target: this.nodesNextMap[1], left: false, right: true },
    { source: this.nodesNextMap[1], target: this.linkwords[16], left: false, right: false },
    { source: this.linkwords[16], target: this.nodesNextMap[2], left: false, right: true },
    { source: this.nodesNextMap[1], target: this.linkwords[17], left: false, right: false },
    { source: this.linkwords[17], target: this.nodesNextMap[3], left: false, right: true },
    { source: this.linkwords[17], target: this.nodesNextMap[4], left: false, right: true },
    { source: this.linkwords[17], target: this.nodesNextMap[5], left: false, right: true },

   
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
    { target: this.nodes[15], hidden: true, width: 60, height: 80},
    { target: this.nodes[16], hidden: true, width: 60, height: 80},
    { target: this.nodes[17], hidden: true, width: 60, height: 80},
    { target: this.nodes[18], hidden: true, width: 60, height: 80},
    { target: this.nodes[19], hidden: true, width: 60, height: 80},
    { target: this.nodes[20], hidden: true, width: 60, height: 80},

    { target: this.nodesNextMap[0], hidden: true, width: 60, height: 80},
    { target: this.nodesNextMap[1], hidden: true, width: 60, height: 80},
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
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[15], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[16], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[17], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[18], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[19], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[20], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodesNextMap[0], hidden: true},
    {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodesNextMap[1], hidden: true},
  ];


  ngAfterContentInit() {

    
    // document.getElementById('slider').style.color = 'black';
    
    // (<HTMLInputElement>document.getElementById('slider')).onchange = this.restart;


  var svgArray = this.buildMapService.initSvg(this.svg, this.width, this.height, this.path, this.circle, this.linkword, this.glossary, this.gText, this.gImage, this.sliderCircle, this.circleNextMap, this.toNextMapRect, this.linkwords, this.toNextMapButton);

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

  this.svg.append("polygon")
  .attr('class', 'cluster')
  .attr("points", "380,20 250,130 40,60 30,300 250,450 500,450 650,400 720,100")
  .style("fill", "lightgreen")
  .style('opacity', '0.6')
  .style("stroke", "black")
  .style("strokeWidth", "10px")
  .attr('visibility', 'hidden')
  .on('mousedown', (d)=>{
    this.svg.append('rect')
    .attr('class', 'progress')
    .attr('x', '400')
    .attr('y', '200')
    .attr('width', '100')
    .attr('height', '60')
    .attr('rx', '5')
    .attr('ry', '5')
    .style('fill', 'blue')
    .style('opacity', '0.8');

    this.svg.append('text')
    .attr('class', 'progress')
    .attr('x', '450')
    .attr('y', '210')
    .attr('fill', 'white')
    .attr('font-size', '5')
    .attr('text-anchor', 'middle')
    .text('progress : 0%')
  })
  ;

  this.svg.append("polygon")
  .attr('class', 'clusterNextMap')
  .attr("points", "650,400 720,100 920,50 1200,300 1240,380 1200,450")
  .style("fill", "lightyellow")
  .style('opacity', '0.6')
  .style("stroke", "black")
  .style("strokeWidth", "10px")
  .attr('visibility', 'hidden')
  .on('mousedown', (d)=>{
    this.svg.append('rect')
    .attr('class', 'progress')
    .attr('x', '800')
    .attr('y', '200')
    .attr('width', '100')
    .attr('height', '60')
    .attr('rx', '5')
    .attr('ry', '5')
    .style('fill', 'blue')
    .style('opacity', '0.8');

    this.svg.append('text')
    .attr('class', 'progress')
    .attr('x', '850')
    .attr('y', '210')
    .attr('fill', 'white')
    .attr('font-size', '5')
    .attr('text-anchor', 'middle')
    .text('progress : 0%')
  })
  ;

  this.svg.append('circle')
  .attr('class', 'activateCluster')
  .attr('cx', '50')
  .attr('cy', '420')
  .attr('r', 10)
  .attr('fill','orange')
  .attr('cursor', 'pointer')
  .on('mousedown', (d)=>{
    // if(this.svg.selectAll('polygon').attr('visibility')==='hidden'){
    //   this.svg.selectAll('rect.progress').remove();
    // }
    this.svg.selectAll('polygon').attr('visibility', this.svg.selectAll('polygon').attr('visibility')==='hidden'?'visible':'hidden')
    
    
    if(this.svg.select('circle.rotate').attr('cy')==='0'){
      this.svg.select('circle.rotate')
      .transition()
      .duration(1000)
      .attr('transform', 'rotate(90, 0, 0)');
    }
    else{
      this.svg.select('circle.rotate')
      .transition()
      .duration(1000)
      .attr('transform', 'rotate(-90, 0, 0)');
    }

  })
  .on('mouseup', (d)=>{
    if(this.svg.selectAll('polygon').attr('visibility')==='hidden'){
      this.svg.selectAll('rect.progress').remove();
      this.svg.selectAll('text.progress').remove();
    }

  })


  this.svg.append('circle')
  .attr('class', 'rotate1')
  .attr('cx', '0')
  .attr('cy', '0')
  .attr('r', 50)
  .attr('fill','red')
  // .attr('cursor', 'pointer')
  .on('mousedown', (d)=>{  
  })
  .on('mouseup', (d)=>{
  })
  ;

  this.svg.append('circle')
    .attr('class', 'rotate')
    .attr('cx', '40')
    .attr('cy', '0')
    .attr('r', 10)
    .attr('fill','white')
    ;


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


delayNavigation() {
  this.router.navigate([this.routerLink]);
}

// refresh function
  restart() {  

var offset = 0;

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

if(this.routerLink!=null){
  
  this.svg.selectAll('ellipse').transition()
  .duration(750)
  .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
  this.svg.selectAll('text.eText').transition()
  .duration(750)
  .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
  this.svg.selectAll('text.linkword').transition()
  .duration(750)
  .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
  this.svg.selectAll('path.link').transition()
  .duration(750)
  .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
  this.svg.selectAll('ellipse.linkword').transition()
  .duration(750)
  .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
  this.svg.selectAll('rect.gRect').transition()
  .duration(750)
  .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
  this.svg.selectAll('text.gText').transition()
  .duration(750)
  .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
  this.svg.selectAll('image.gImage').transition()
  .duration(750)
  .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
  this.svg.selectAll('text.eTextNextMap').transition()
  .duration(750)
  .attr('transform', 'translate(' + -600  + ',' + 0 + ')');




  setTimeout(function(){
    d3.select('rect.toNext').attr('visibility', 'hidden');
    d3.select('text.toNext').attr('visibility', 'hidden');
    d3.selectAll('rect.button').attr('visibility', 'hidden');
    d3.select('svg').attr('ready', true);
  }, 750)

  setTimeout(() => { this.delayNavigation(); }, 750);



  
}



  }
}

