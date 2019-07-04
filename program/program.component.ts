import { Component, ElementRef, ViewChild, OnInit, DoCheck } from '@angular/core';
import * as d3 from 'd3';
import {style} from '@angular/animations';
// import { svg } from 'd3';
import { BuildMapService } from '../buildMap.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import example from '../assets/example.json';
import json from '../data.json';
import { TestMapService } from '../testMap.service';
import { rgb } from 'd3';


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
  providers: [BuildMapService, TestMapService],
})
export class ProgramComponent implements OnInit{

  pageNumber : number = 5;

  pdfSrc = "https://cors-anywhere.herokuapp.com/http://greenteapress.com/thinkjava6/thinkjava.pdf";

  constructor(private buildMapService: BuildMapService, private router: Router, private testMapService: TestMapService){
  }




  ngOnInit(){  
   
   // console.log(json.nodes);
    this.nodes = json.nodes2;
    this.nodesNextMap = json.nodesNextMap2;
    this.linkwords = json.linkwords2;


    var temp = json.links2;
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

    var temp2 = json.glossaries2;
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
    var temp3 = json.gTexts2;
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
  gButton: any;

  sliderCircle: any;
  circleNextMap: any;
  toNextMapRect: any;
  routerLink: any;
  toNextMapButton: any;

  fullResult : any;
  
 

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


  var svgArray = this.buildMapService.initSvg(this.svg, this.width, this.height, this.path, this.circle, this.linkword, this.glossary, this.gText, this.gImage, this.sliderCircle, this.circleNextMap, this.toNextMapRect, this.linkwords, this.toNextMapButton, this.gButton);

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



  var polygon =  this.svg.append("polygon")
  .attr('class', 'cluster')
  .attr("points", "380,5 250,80 40,30 0,160 160,450 500,450 1050,450 1000,200")
  .style("fill", "lightgreen")
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

      if((parseInt(data['program']['choicetest']['true'])+parseInt(data['program']['choicetest']['false'])!==0)){
        resultChoicetest = parseInt(data['program']['choicetest']['true']) / (parseInt(data['program']['choicetest']['true'])+parseInt(data['program']['choicetest']['false']));
      }

      if((parseInt(data['program']['blocktest']['total']['true'])+parseInt(data['program']['blocktest']['total']['false'])!==0)){
        resultBlocktest = parseInt(data['program']['blocktest']['total']['true']) / (parseInt(data['program']['blocktest']['total']['true'])+parseInt(data['program']['blocktest']['total']['false']));
      }
      
      this.svg.select('text.progress').text('choiceTest: '+resultChoicetest+'% blockTest: '+resultBlocktest+'%');
  })
  ;
  })
  ;


  this.svg.append("polygon")
  .attr('class', 'clusterNextMap')
  .attr("points", "1050,450 1000,200 1050,70 1200,20 1240,120 1240,450")
  .style("fill", "lightyellow")
  .style('opacity', '0.6')
  .style("stroke", "black")
  .style("strokeWidth", "10px")
  .attr('visibility', 'hidden')
  .on('mousedown', (d)=>{
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

  })
  .on('mouseup', (d)=>{
    if(this.svg.selectAll('polygon').attr('visibility')==='hidden'){
      this.svg.selectAll('rect.progress').remove();
      this.svg.selectAll('text.progress').remove();
    }

  })

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


    var button = this.svg.append("foreignObject")
    .attr("width", 80)
    .attr("height", 40)
    .attr('x', '550')
    .attr('y', '10')
    .append('xhtml:div')
    .attr('class','button')
    .html('<a href="http://localhost:4200/program/modify2" class="btn btn-primary btn-sm active btn-block" role="button" aria-pressed="true">Modify</a>');


    var button1 = this.svg.append("foreignObject")
    .attr("width", 80)
    .attr("height", 40)
    .attr('x', '640')
    .attr('y', '10')
    .append('xhtml:div')
    .attr('class','button')
    .html('<a href="http://localhost:4200/program/test2" class="btn btn-primary btn-sm active btn-block" role="button" aria-pressed="true">Test</a>');







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
        this.svg.selectAll('foreignObject.gButton').attr('visibility','hidden');
        this.svg.select('foreignObject.pdf').attr('visibility','hidden');

        this.restart();

    }

    this.restart();
  }

  mouseup(source: any) {

    console.log('mouseup');

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

var buildMap = this.buildMapService.buildMicroMap(this.svg, this.path, this.links, this.glossary, this.glossaries, this.gText, this.gTexts, this.gImage, this.gButton, this.circle, this.nodes, this.linkword, this.linkwords, this.sliderCircle, this.nodesNextMap, this.circleNextMap, offset, 'program');

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



// this.testMapService.callServerTest().subscribe(data=>{
//   for(var t = 0; t<this.nodes.length; t++){


//     if (this.svg.selectAll('ellipse.node').filter(function(a,i){
//       return a['id']===t;
//     }).attr('locked')==='false'){

//       this.svg.selectAll('ellipse.node').filter(function(a,i){
//         return a['id']===t;
//       })
//       .style('fill',(d)=>{
//         var correct = parseInt(data['program']['blocktest']['node'+t]['true']);
//         var wrong = parseInt(data['program']['blocktest']['node'+t]['false']);

//         if(correct===0&&wrong===0){
//           return rgb(125,0,0);
//         }
//         else if(correct===wrong){
//           return rgb(125,125,0);
//         }
//         else if(correct>wrong){
//           return rgb(125*wrong/correct,125,0);
//         }
//         else{
//           return rgb(125,125*correct/wrong,0)
//         }
//       })
//     }
//   }
// })


this.routerLink = buildMap[8];
// console.log(this.routerLink);

if(this.routerLink!=null){
  
  this.svg.selectAll('ellipse').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -900  + ',' + 0 + ')');
  this.svg.selectAll('text.eText').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -900  + ',' + 0 + ')');
  this.svg.selectAll('text.linkword').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -900  + ',' + 0 + ')');
  this.svg.selectAll('path.link').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -900  + ',' + 0 + ')');
  this.svg.selectAll('ellipse.linkword').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -900  + ',' + 0 + ')');
  this.svg.selectAll('rect.gRect').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -900  + ',' + 0 + ')');
  this.svg.selectAll('text.gText').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -900  + ',' + 0 + ')');
  this.svg.selectAll('image.gImage').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -900  + ',' + 0 + ')');
  this.svg.selectAll('text.eTextNextMap').transition()
  .duration(750)
  .attr('transform', 'translate(' +  -900  + ',' + 0 + ')');




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

