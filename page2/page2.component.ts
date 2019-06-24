import { Component, ElementRef, ViewChild, OnInit, DoCheck } from '@angular/core';
import * as d3 from 'd3';
import {style} from '@angular/animations';
// import { svg } from 'd3';
import { BuildMapService } from '../buildMap.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import example from '../assets/example.json';
import json from './page2.json';
import { PdfViewerComponent } from 'ng2-pdf-viewer';


@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css'],
  providers: [BuildMapService],
})
export class Page2Component implements OnInit{

  pageNumber : number = 5;

  pdfSrc = "https://cors-anywhere.herokuapp.com/http://greenteapress.com/thinkjava6/thinkjava.pdf";

  constructor(private buildMapService: BuildMapService, private router: Router){
  }




  ngOnInit(){

  
   
   // console.log(json.nodes);
    this.nodes = json.nodes;
    this.nodesNextMap = json.nodesNextMap;
    this.linkwords = json.linkwords;


    var temp = json.links;
    for(var i = 0; i<temp.length; i++){
      var link = {"source":null, "target":null, "left": false, "right": true};
      if(temp[i].source.includes("nodes["))
      {
        // console.log(temp[i]);
       var n = parseInt(temp[i].source.split("nodes[")[1].split(']')[0]);
      //  console.log(n);
       link.source = this.nodes[n];
      }
      if(temp[i].target.includes("nodes["))
      {
        // console.log(temp[i]);
       var n = parseInt(temp[i].target.split("nodes[")[1].split(']')[0]);
      //  console.log(n);
       link.target = this.nodes[n];
      }
      if(temp[i].source.includes("linkwords["))
      {
        var n = parseInt(temp[i].source.split("linkwords[")[1].split(']')[0]);
        // console.log(n);
        link.source = this.linkwords[n];
      }
      if(temp[i].target.includes("linkwords["))
      {
        var n = parseInt(temp[i].target.split("linkwords[")[1].split(']')[0]);
        // console.log(n);
        link.target = this.linkwords[n];
      }
      if(temp[i].source.includes("nodesNextMap["))
      {
        // console.log(temp[i]);
       var n = parseInt(temp[i].source.split("nodesNextMap[")[1].split(']')[0]);
      //  console.log(n);
       link.source = this.nodesNextMap[n];
      }
      if(temp[i].target.includes("nodesNextMap["))
      {
        // console.log(temp[i]);
       var n = parseInt(temp[i].target.split("nodesNextMap[")[1].split(']')[0]);
      //  console.log(n);
       link.target = this.nodesNextMap[n];
      }
      this.links.push(link);
    }

    var temp2 = json.glossaries;
    for(var i = 0; i<temp2.length; i++){
      var glossary = {"target":null, "hidden":true, "width": 60, "height": 80, "page": null};
      glossary.page = temp2[i].page;
      if(temp2[i].target.includes("nodes["))
      {
        // console.log(temp[i]);
       var n = parseInt(temp2[i].target.split("nodes[")[1].split(']')[0]);
      //  console.log(n);
       glossary.target = this.nodes[n];
      }
      if(temp2[i].target.includes("nodesNextMap["))
      {
        // console.log(temp[i]);
       var n = parseInt(temp2[i].target.split("nodesNextMap[")[1].split(']')[0]);
      //  console.log(n);
       glossary.target = this.nodesNextMap[n];
      }
      this.glossaries.push(glossary);
    }
    var temp3 = json.gTexts;
    for(var i = 0; i<temp3.length; i++){
      var gText = {"text":null, "target":null, "hidden": true, "page": null};
      gText.page = temp3[i].page;
      if(temp3[i].target.includes("nodes["))
      {
        // console.log(temp[i]);
       var n = parseInt(temp3[i].target.split("nodes[")[1].split(']')[0]);
      //  console.log(n);
       gText.target = this.nodes[n];
      }
      if(temp3[i].target.includes("nodesNextMap["))
      {
        // console.log(temp[i]);
       var n = parseInt(temp3[i].target.split("nodesNextMap[")[1].split(']')[0]);
      //  console.log(n);
       gText.target = this.nodesNextMap[n];
      }
      gText.text = temp3[i].text;
      // console.log(gText);
      this.gTexts.push(gText);
    }
    //  console.log(this.gTexts);


 
    // console.log(this.nodes[0]);
  }

  title = 'KomTest';

  @ViewChild('pdfViewer', {static: false}) pdfViewers: ElementRef;

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
    // { id: 0, text: 'program', x: 400, y: 70, reflexive: true },
    // { id: 1, text: 'statement', x: 400, y: 140, reflexive: true },
    // { id: 2, text: 'conditional statement', x: 200, y: 160, reflexive: true },
    // { id: 3, text: 'chaining', x: 100, y: 140, reflexive: true },
    // { id: 4, text: 'nesting', x: 70, y: 180, reflexive: true },
    // { id: 5, text: 'relational operator', x: 150, y: 220, reflexive: true },
    // { id: 6, text: 'logical operator', x: 250, y: 220, reflexive: true },
    // { id: 7, text: 'assignment', x: 310, y: 200, reflexive: true },
    // { id: 8, text: 'declaration', x: 400, y: 200, reflexive: true },
    // { id: 9, text: 'initialization', x: 490, y: 200, reflexive: true },
    // { id: 10, text: 'print statement', x: 620, y: 200, reflexive: true },
    // { id: 11, text: 'input', x: 520, y: 300, reflexive: false },
    // { id: 12, text: 'output', x: 590, y: 300, reflexive: false },
    // { id: 13, text: 'Scanner class', x: 450, y: 380, reflexive: false },
    // { id: 14, text: 'System class', x: 590, y: 380, reflexive: false },
    // { id: 15, text: 'loop', x: 280, y: 330, reflexive: false },
    // { id: 16, text: 'loop body', x: 180, y: 360, reflexive: false },
    // { id: 17, text: 'loop variable', x: 240, y: 380, reflexive: false },
    // { id: 18, text: 'increment loop', x: 290, y: 420, reflexive: false },
    // { id: 19, text: 'pretest loop', x: 360, y: 420, reflexive: false },
    // { id: 20, text: 'posttest loop', x: 430, y: 420, reflexive: false },

    // // { id: 21, text: 'value', x: 620, y: 100, reflexive: false },
    // // { id: 22, text: 'variable', x: 750, y: 150, reflexive: false },
  ];

  nodesNextMap = [
    // { id: 0, text: 'value', x: 870, y: 100, reflexive: false },
    // { id: 1, text: 'variable', x: 1130, y: 300, reflexive: false },
    // { id: 2, text: 'constant', x: 930, y: 300, reflexive: false },
    // { id: 3, text: 'instance variable', x: 980, y: 380, reflexive: false },
    // { id: 4, text: 'local variable', x: 1100, y: 380, reflexive: false },
    // { id: 5, text: 'class variable', x: 1200, y: 380, reflexive: false },
    
  ];


   // store the link words
   linkwords = [
    //  {id: 0, text: 'has', x: 400, y: 100, reflexive: false},
    //  {id: 1, text: 'put', x: 350, y: 100, reflexive: false},
    //  {id: 2, text: 'has type', x: 400, y: 165, reflexive: false},
    //  {id: 3, text: 'has', x: 150, y: 150, reflexive: false},
    //  {id: 4, text: 'may use', x: 135, y: 170, reflexive: false},
    //  {id: 5, text: 'can have', x: 210, y: 190, reflexive: false},
    //  {id: 6, text: 'put first', x: 480, y: 140, reflexive: false},
    //  {id: 7, text: 'has', x: 550, y: 160, reflexive: false},
    //  {id: 8, text: 'create', x: 680, y: 160, reflexive: false},
    //  {id: 9, text: 'shows', x: 605, y: 250, reflexive: false},
    //  {id: 10, text: 'by', x: 510, y: 340, reflexive: false},
    //  {id: 11, text: 'by', x: 590, y: 340, reflexive: false},
    //  {id: 12, text: 'contains', x: 230, y: 345, reflexive: false},
    //  {id: 13, text: 'has type', x: 300, y: 380, reflexive: false},
    //  {id: 14, text: 'can be repeated in', x: 330, y: 270, reflexive: false},
    //  {id: 15, text: 'into', x: 950, y: 160, reflexive: false},
    //  {id: 16, text: 'declared with final type', x: 1025, y: 300, reflexive: false},
    //  {id: 17, text: 'has type', x: 1100, y: 340, reflexive: false},
   ];

  // store the links
  links = [
    // { source: this.nodes[0], target: this.linkwords[0], left: false, right: false },
    // { source: this.nodes[0], target: this.linkwords[7], left: false, right: false },
    // { source: this.linkwords[0], target: this.nodes[1], left: false, right: true },
    // { source: this.nodes[1], target: this.linkwords[2], left: false, right: false },
    // { source: this.linkwords[2], target: this.nodes[7], left: false, right: true },
    // { source: this.linkwords[2], target: this.nodes[8], left: false, right: true },
    // { source: this.linkwords[2], target: this.nodes[9], left: false, right: true },
    // { source: this.linkwords[2], target: this.nodes[10], left: false, right: true },
    // { source: this.nodes[2], target: this.linkwords[3], left: false, right: false },
    // { source: this.nodes[2], target: this.linkwords[4], left: false, right: false },
    // { source: this.nodes[2], target: this.linkwords[5], left: false, right: false },
    // { source: this.linkwords[3], target: this.nodes[3], left: false, right: true },
    // { source: this.linkwords[4], target: this.nodes[4], left: false, right: true },
    // { source: this.linkwords[5], target: this.nodes[5], left: false, right: true },
    // { source: this.linkwords[5], target: this.nodes[6], left: false, right: true },
    // { source: this.nodes[7], target: this.linkwords[1], left: false, right: false },
    // { source: this.nodes[8], target: this.linkwords[6], left: false, right: false },
    // { source: this.nodes[9], target: this.linkwords[8], left: false, right: false },
    // { source: this.linkwords[7], target: this.nodes[11], left: false, right: true },
    // { source: this.linkwords[7], target: this.nodes[12], left: false, right: true },
    // { source: this.nodes[12], target: this.linkwords[9], left: false, right: false },
    // { source: this.linkwords[9], target: this.nodes[10], left: false, right: true },
    // { source: this.nodes[11], target: this.linkwords[10], left: false, right: false },
    // { source: this.linkwords[10], target: this.nodes[13], left: false, right: true },
    // { source: this.nodes[12], target: this.linkwords[11], left: false, right: false },
    // { source: this.linkwords[11], target: this.nodes[14], left: false, right: true },
    // { source: this.nodes[1], target: this.linkwords[14], left: false, right: false },
    // { source: this.linkwords[14], target: this.nodes[15], left: false, right: true },
    // { source: this.nodes[15], target: this.linkwords[12], left: false, right: false },
    // { source: this.nodes[15], target: this.linkwords[13], left: false, right: false },
    // { source: this.linkwords[12], target: this.nodes[16], left: false, right: true },
    // { source: this.linkwords[12], target: this.nodes[17], left: false, right: true },
    // { source: this.linkwords[13], target: this.nodes[18], left: false, right: true },
    // { source: this.linkwords[13], target: this.nodes[19], left: false, right: true },
    // { source: this.linkwords[13], target: this.nodes[20], left: false, right: true },

    // { source: this.linkwords[1], target: this.nodesNextMap[0], left: false, right: true },
    // { source: this.linkwords[6], target: this.nodesNextMap[0], left: false, right: true },
    // { source: this.linkwords[8], target: this.nodesNextMap[1], left: false, right: true },
    // { source: this.nodesNextMap[0], target: this.linkwords[15], left: false, right: false },
    // { source: this.linkwords[15], target: this.nodesNextMap[1], left: false, right: true },
    // { source: this.nodesNextMap[1], target: this.linkwords[16], left: false, right: false },
    // { source: this.linkwords[16], target: this.nodesNextMap[2], left: false, right: true },
    // { source: this.nodesNextMap[1], target: this.linkwords[17], left: false, right: false },
    // { source: this.linkwords[17], target: this.nodesNextMap[3], left: false, right: true },
    // { source: this.linkwords[17], target: this.nodesNextMap[4], left: false, right: true },
    // { source: this.linkwords[17], target: this.nodesNextMap[5], left: false, right: true },

   
  ];

  // store the white rectangulars as simulation for text fields
  glossaries = [
    // { target: this.nodes[0], hidden: true, width: 60, height: 80},
    // { target: this.nodes[1], hidden: true, width: 60, height: 80},
    // { target: this.nodes[2], hidden: true, width: 60, height: 80},
    // { target: this.nodes[3], hidden: true, width: 60, height: 80},
    // { target: this.nodes[4], hidden: true, width: 60, height: 80},
    // { target: this.nodes[5], hidden: true, width: 60, height: 80},
    // { target: this.nodes[6], hidden: true, width: 60, height: 80},
    // { target: this.nodes[7], hidden: true, width: 60, height: 80},
    // { target: this.nodes[8], hidden: true, width: 60, height: 80},
    // { target: this.nodes[9], hidden: true, width: 60, height: 80},
    // { target: this.nodes[10], hidden: true, width: 60, height: 80},
    // { target: this.nodes[11], hidden: true, width: 60, height: 80},
    // { target: this.nodes[12], hidden: true, width: 60, height: 80},
    // { target: this.nodes[13], hidden: true, width: 60, height: 80},
    // { target: this.nodes[14], hidden: true, width: 60, height: 80},
    // { target: this.nodes[15], hidden: true, width: 60, height: 80},
    // { target: this.nodes[16], hidden: true, width: 60, height: 80},
    // { target: this.nodes[17], hidden: true, width: 60, height: 80},
    // { target: this.nodes[18], hidden: true, width: 60, height: 80},
    // { target: this.nodes[19], hidden: true, width: 60, height: 80},
    // { target: this.nodes[20], hidden: true, width: 60, height: 80},

    // { target: this.nodesNextMap[0], hidden: true, width: 60, height: 80},
    // { target: this.nodesNextMap[1], hidden: true, width: 60, height: 80},
  ];

  gTexts = [
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[0], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[1], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[2], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[3], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[4], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[5], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[6], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[7], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[8], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[9], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[10], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[11], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[12], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[13], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[14], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[15], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[16], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[17], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[18], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[19], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodes[20], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodesNextMap[0], hidden: true},
    // {text: 'this is only a text for test, later we will put the glossary here. For now the width will be adjusted automatically according to the size of rectangular.', target: this.nodesNextMap[1], hidden: true},
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
    

    // this.svg.select('circle.rotate')
    // .transition()
    // .duration(0)
    // .attr('transform', 'translate (50,50)')

    // this.svg.select('circle.rotate1')
    // .transition()
    // .duration(0)
    // .attr('transform', 'translate (50,50)')

    // this.svg
    // .transition()
    // .duration(0)
    // .attr('transform', 'translate (50,50)')


    
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


   var viewer =   this.svg.select('foreignObject')
    // .attr('x', '0')
    .select('pdf-viewer')
    .on('mousedown', (d)=>{
      // this.svg.select('pdf-viewer')
      // .attr('page', '1');
      this.pageNumber = 50;
      this.svg.select('foreignObject')
      .attr('visibility', 'hidden');
    })
    ;


    // this part works with normal html element

    // this.svg.append("foreignObject")
    // .attr("width", 800)
    // .attr("height", 400)
    // .append("xhtml:div")
    // .style("font", "14px 'Helvetica Neue'")
    // .html("<h1>An HTML Foreign Object in SVG</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu enim quam. Quisque nisi risus, sagittis quis tempor nec, aliquam eget neque. Nulla bibendum semper lorem non ullamcorper. Nulla non ligula lorem. Praesent porttitor, tellus nec suscipit aliquam, enim elit posuere lorem, at laoreet enim ligula sed tortor. Ut sodales, urna a aliquam semper, nibh diam gravida sapien, sit amet fermentum purus lacus eget massa. Donec ac arcu vel magna consequat pretium et vel ligula. Donec sit amet erat elit. Vivamus eu metus eget est hendrerit rutrum. Curabitur vitae orci et leo interdum egestas ut sit amet dui. In varius enim ut sem posuere in tristique metus ultrices.<p>Integer mollis massa at orci porta vestibulum. Pellentesque dignissim turpis ut tortor ultricies condimentum et quis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod lorem vulputate dui pharetra luctus. Sed vulputate, nunc quis porttitor scelerisque, dui est varius ipsum, eu blandit mauris nibh pellentesque tortor. Vivamus ultricies ante eget ipsum pulvinar ac tempor turpis mollis. Morbi tortor orci, euismod vel sagittis ac, lobortis nec est. Quisque euismod venenatis felis at dapibus. Vestibulum dignissim nulla ut nisi tristique porttitor. Proin et nunc id arcu cursus dapibus non quis libero. Nunc ligula mi, bibendum non mattis nec, luctus id neque. Suspendisse ut eros lacus. Praesent eget lacus eget risus congue vestibulum. Morbi tincidunt pulvinar lacus sed faucibus. Phasellus sed vestibulum sapien.");


    //this part dosen't work with pdf-viewer

    // this.svg.append("foreignObject")
    // .attr('y',200)
    // .attr("width", 800)
    // .attr("height", 480)
    // .append("xhtml:pdf-viewer")
    // .style("display", "block")
    // .attr("src", this.pdfSrc)
    // // .attr('ng-reflect-src', 'https://cors-anywhere.herokuap')
    // .attr("render-text", true)
    // // .attr('ng-reflect-render-text',true)
    // .attr("page", "21")
    // // .attr('ng-reflect-page', '21')
    // // .attr('ng-reflect-zoom', '0.5')
    // // .attr('ng-reflect-show-all', false)
    // // .src(this.pdfSrc)

    var element = document.getElementsByTagName("pdf-viewer")[0];
    // element.addEventListener("change", this.restart);
    // element.setAttribute('zoom', '0.2');
    // element.addEventListener("change", this.restart);
    
    console.log(element);


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

this.pageNumber = this.svg.attr("page");

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

