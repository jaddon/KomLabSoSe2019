import { Component, ElementRef, ViewChild, OnInit, SimpleChanges, DoCheck } from '@angular/core';
import * as d3 from 'd3';
import {style} from '@angular/animations';
// import { svg } from 'd3';
import { BuildMapService } from '../buildMap.service';
import { Router } from '@angular/router';
import json from '../data.json';
import { TestMapService } from '../testMap.service';

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css'],
  providers: [BuildMapService, TestMapService],
})
export class MethodComponent implements OnInit{


  pageNumber : number = 5;

  pdfSrc = "https://cors-anywhere.herokuapp.com/http://greenteapress.com/thinkjava6/thinkjava.pdf";

  constructor(private buildMapService: BuildMapService, private router: Router, private testMapService: TestMapService){
  }

  ngOnInit(){
    // console.log(json.nodes);
    this.nodes = json.nodes7;
    this.nodesNextMap = json.nodesNextMap7;
    this.linkwords = json.linkwords7;


    var temp = json.links7;
    for(var i = 0; i<temp.length; i++){
      var link = {"source":null, "target":null, "left": false, "right": true, "id":null};
      link.id = temp[i].id;
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

    var temp2 = json.glossaries7;
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

    var temp3 = json.gTexts7;
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
 nodes = [];

nodesNextMap = [];

 // store the link words
 linkwords =  [];

// store the links
links = [];

// store the white rectangulars as simulation for text fields
glossaries = [];

gTexts = [];


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

  

  var polygon = this.svg.append("polygon")
  .attr('class', 'cluster')
  .attr("points", "380,5 250,30 80,100 0,160 250,300 500,400 1200,400 1240,200")
  .style("fill", "white")
  .style('opacity', '0.6')
  .style("stroke", "black")
  .style("strokeWidth", "10px")
  .attr('visibility', 'hidden');


  var gProgress = this.svg.append('svg:g')
  .attr('class', 'progress')
  .attr('visibility', 'hidden');


  gProgress.append('rect')
    .attr('class', 'progress')
    .attr('x', '250')
    .attr('y', '200')
    .attr('width', '400')
    .attr('height', '60')
    .attr('rx', '5')
    .attr('ry', '5')
    .style('fill', 'blue')
    .style('opacity', '0.8')

 gProgress.append('text')
 .attr('class', 'progress')
 .attr('x', '450')
 .attr('y', '210')
 .attr('fill', 'white')
 .attr('font-size', '5')
 .attr('text-anchor', 'middle')
  


   polygon.on('mousedown', (d)=>{

    this.svg.select('g.progress').attr('visibility', (d)=>(this.svg.select('g.progress').attr('visibility')==='hidden')?'visible':'hidden')

    this.testMapService.callServerTest().subscribe(data=>{

      var resultChoicetest = 0;
      var resultBlocktest = 0;

      if((parseInt(data['method']['choicetest']['true'])+parseInt(data['method']['choicetest']['false'])!==0)){
        resultChoicetest = parseInt(data['method']['choicetest']['true']) / (parseInt(data['method']['choicetest']['true'])+parseInt(data['method']['choicetest']['false']));
      }

      if((parseInt(data['method']['blocktest']['total']['true'])+parseInt(data['method']['blocktest']['total']['false'])!==0)){
        resultBlocktest = parseInt(data['method']['blocktest']['total']['true']) / (parseInt(data['method']['blocktest']['total']['true'])+parseInt(data['method']['blocktest']['total']['false']));
      }

      this.svg.select('text.progress').text('choiceTest: '+resultChoicetest+'% blockTest: '+resultBlocktest+'%');
  })
  ;
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
      this.svg.select('g.progress').attr('visibility', 'hidden');
    }

  })


  this.svg.append('text')
  .attr('class', 'activateCluster')
  .attr('x', '50')
  .attr('y', '450')
  .attr('fill', 'purple')
  .attr('font-size', '5')
  .attr('text-anchor', 'middle')
  .text('activate cluster')


  var button = this.svg.append("foreignObject")
  .attr("width", 80)
  .attr("height", 40)
  .attr('x', '640')
  .attr('y', '5')
  .append('xhtml:div')
  .attr('class','button')
  .html('<a href="http://localhost:4200/method/modify7" class="btn btn-primary btn-sm active btn-block" role="button" aria-pressed="true">Modify</a>');


  var button1 = this.svg.append("foreignObject")
  .attr("width", 110)
  .attr("height", 40)
  .attr('x', '520')
  .attr('y', '25')
  .append('xhtml:div')
  .attr('class','button')
  .html('<a href="http://localhost:4200/method/test7" class="btn btn-primary btn-sm active btn-block" role="button" aria-pressed="true">Block Test</a>');

  var button2 = this.svg.append("foreignObject")
  .attr("width", 110)
  .attr("height", 40)
  .attr('x', '730')
  .attr('y', '25')
  .append('xhtml:div')
  .attr('class','button')
  .html('<a href="http://localhost:4200/method/singleChoice" class="btn btn-primary btn-sm active btn-block" role="button" aria-pressed="true">Choice Test</a>');



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

delayNavigation() {
  this.router.navigate([this.routerLink]);
}


// refresh function
  restart() {  
var buildMap = this.buildMapService.buildMicroMap(this.svg, this.path, this.links, this.glossary, this.glossaries, this.gText, this.gTexts, this.gImage, this.gButton, this.circle, this.nodes, this.linkword, this.linkwords, this.sliderCircle, this.nodesNextMap, this.circleNextMap, 0, 'class');

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
this.gButton = buildMap[9];
this.gButton.merge(this.gButton);

this.routerLink = buildMap[8];

if(this.routerLink==='/variable'){
  
  this.svg.selectAll('ellipse').transition()
  .duration(750)
  .attr('transform', 'translate(' +  0  + ',' + -260 + ')');
  this.svg.selectAll('text.eText').transition()
  .duration(750)
  .attr('transform', 'translate(' +  0  + ',' + -260 + ')');
  this.svg.selectAll('text.linkword').transition()
  .duration(750)
  .attr('transform', 'translate(' +  0  + ',' + -260 + ')');
  this.svg.selectAll('path.link').transition()
  .duration(750)
  .attr('transform', 'translate(' +  0  + ',' + -260 + ')');
  this.svg.selectAll('ellipse.linkword').transition()
  .duration(750)
  .attr('transform', 'translate(' +  0  + ',' + -260 + ')');
  this.svg.selectAll('rect.gRect').transition()
  .duration(750)
  .attr('transform', 'translate(' +  0  + ',' + -260 + ')');
  this.svg.selectAll('text.gText').transition()
  .duration(750)
  .attr('transform', 'translate(' +  0  + ',' + -260 + ')');
  this.svg.selectAll('image.gImage').transition()
  .duration(750)
  .attr('transform', 'translate(' +  0  + ',' + -260 + ')');
  this.svg.selectAll('text.eTextNextMap').transition()
  .duration(750)
  .attr('transform', 'translate(' +  0  + ',' + -260 + ')');
}

else if(this.routerLink==='/object'){
  
  this.svg.selectAll('ellipse').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -730  + ',' + -330 + ')');
  this.svg.selectAll('text.eText').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -730  + ',' + -330 + ')');
  this.svg.selectAll('text.linkword').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -730  + ',' + -330 + ')');
  this.svg.selectAll('path.link').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -730  + ',' + -330 + ')');
  this.svg.selectAll('ellipse.linkword').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -730  + ',' + -330 + ')');
  this.svg.selectAll('rect.gRect').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -730  + ',' + -330 + ')');
  this.svg.selectAll('text.gText').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -730  + ',' + -330 + ')');
  this.svg.selectAll('image.gImage').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -730  + ',' + -330 + ')');
  this.svg.selectAll('text.eTextNextMap').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -730  + ',' + -330 + ')');
}




if(this.routerLink!==null){
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


