import { Component, ElementRef, ViewChild, OnInit, SimpleChanges, DoCheck } from '@angular/core';
import * as d3 from 'd3';
import {style} from '@angular/animations';
// import { svg } from 'd3';
import { BuildMapService } from '../buildMap.service';
import { Router } from '@angular/router';
import json from '../data.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-variable',
  templateUrl: './variable.component.html',
  styleUrls: ['./variable.component.css'],
  providers: [BuildMapService],
})
export class VariableComponent implements OnInit{

  pageNumber : number = 5;

  pdfSrc = "https://cors-anywhere.herokuapp.com/http://greenteapress.com/thinkjava6/thinkjava.pdf";

  constructor(private buildMapService: BuildMapService, private router: Router, private http: HttpClient){
  }

  callServer() {
    const headers = new HttpHeaders()
          .set('Authorization', 'my-auth-token')
          .set('Content-Type', 'application/json');

    this.http.post('http://127.0.0.1:3000/post', JSON.stringify(this.nodes), {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);
    });
    this.http.post('http://127.0.0.1:3000/post', JSON.stringify(this.links), {
      headers: headers
    })
    .subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit(){
     // console.log(json.nodes);
     this.nodes = json.nodes3;
     this.nodesNextMap = json.nodesNextMap3;
     this.linkwords = json.linkwords3;
 
 
     var temp = json.links3;
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
 
     var temp2 = json.glossaries3;
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
     var temp3 = json.gTexts3;
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
  gButton: any;
 

  selectedNode = null;
  selectedLink = null;
  mousedownLink = null;
  mousedownNode = null;
  mouseupNode = null;

  // store the nodes
  nodes = [
  ];

  nodesNextMap = [
  ];


   // store the link words
   linkwords = [
   ];

  // store the links
  links = [
  ];

  // store the white rectangulars as simulation for text fields
  glossaries = [
  ];

  gTexts = [
  ];


  ngAfterContentInit() {

    
    // document.getElementById('slider').style.color = 'black';
    
    // (<HTMLInputElement>document.getElementById('slider')).onchange = this.restart;


  var svgArray = this.buildMapService.initSvg(this.svg, this.width, this.height, this.path, this.circle, this.linkword, this.glossary, this.gText, this.gImage, this.sliderCircle, this.nodesNextMap, this.toNextMapRect, this.linkwords, this.toNextMapButton, this.gButton);

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
  this.gButton = svgArray[10];


  this.svg.append("polygon")
  .attr('class', 'cluster')
  .attr("points", "380,5 250,30 80,100 0,160 480,450 500,450 950,450 800,200")
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

  this.svg.append('circle')
  .attr('class', 'activateCluster')
  .attr('cx', '50')
  .attr('cy', '420')
  .attr('r', 10)
  .attr('fill','orange')
  .attr('cursor', 'pointer')
  .on('mousedown', (d)=>{
    this.svg.selectAll('polygon').attr('visibility', this.svg.selectAll('polygon').attr('visibility')==='hidden'?'visible':'hidden')
  })
  .on('mouseup', (d)=>{
    if(this.svg.selectAll('polygon').attr('visibility')==='hidden'){
      this.svg.selectAll('rect.progress').remove();
      this.svg.selectAll('text.progress').remove();
    }

  })

  var button = this.svg.append("foreignObject")
  .attr("width", 80)
  .attr("height", 40)
  .attr('x', '550')
  .attr('y', '10')
  .append('xhtml:div')
  .attr('class','button')
  .html('<a href="http://localhost:4200/variable/modify3" class="btn btn-primary btn-sm active btn-block" role="button" aria-pressed="true">Modify</a>');


  // post the json data to server
  var postButton = this.svg.append("foreignObject")
  .attr('class','post')
  .attr("width", 80)
  .attr("height", 40)
  .attr('x', '650')
  .attr('y', '10')
  .append('xhtml:div')
  .attr('class','button')
  .html('<button type="button" class="btn btn-primary btn-sm active btn-block">Post</button>');

  this.svg.select('foreignObject.post').on('click',(d)=>{
    this.callServer();
  })


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
        this.svg.selectAll('foreignObject.gButton').attr('visibility','hidden');
        this.svg.select('foreignObject.pdf').attr('visibility','hidden');

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

var offset = 0;

var buildMap = this.buildMapService.buildMicroMap(this.svg, this.path, this.links, this.glossary, this.glossaries, this.gText, this.gTexts, this.gImage, this.gButton, this.circle, this.nodes, this.linkword, this.linkwords, this.sliderCircle, this.nodesNextMap, this.circleNextMap, offset);

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
this.gButton = buildMap[9];
this.gButton.merge(this.gButton);


this.routerLink = buildMap[8];
// console.log(this.routerLink);

// this.svg.selectAll('ellipse').transition()
// .duration(0)
// .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
// this.svg.selectAll('text.eText').transition()
// .duration(0)
// .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
// this.svg.selectAll('text.linkword').transition()
// .duration(0)
// .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
// this.svg.selectAll('path.link').transition()
// .duration(0)
// .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
// this.svg.selectAll('ellipse.linkword').transition()
// .duration(0)
// .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
// this.svg.selectAll('rect.gRect').transition()
// .duration(0)
// .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
// this.svg.selectAll('text.gText').transition()
// .duration(0)
// .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
// this.svg.selectAll('image.gImage').transition()
// .duration(0)
// .attr('transform', 'translate(' + -600  + ',' + 0 + ')');
// this.svg.selectAll('text.eTextNextMap').transition()
//   .duration(0)
//   .attr('transform', 'translate(' + -600  + ',' + 0 + ')');


this.routerLink = buildMap[8];
console.log(this.routerLink);

  }
}


