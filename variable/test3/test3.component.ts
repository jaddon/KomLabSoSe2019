import { Component, ElementRef, ViewChild, OnInit, DoCheck } from '@angular/core';
import * as d3 from 'd3';
import { TestMapService } from '../../testMap.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import json from '../../data.json';


@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css'],
  providers: [TestMapService],
})
export class Test3Component implements OnInit{


  constructor(private testMapService: TestMapService, private router: Router){
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



    // console.log(this.nodes[0]);
  }



  width = 1240;
  height = 480;
  k = 1;
  svg: any;
  circle: any;
  path: any;
  linkword: any;
  circleNextMap: any;
  toNextMapRect: any;
  routerLink: any;
  toNextMapButton: any;
  randomItem:number[] = [];


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


  ngAfterContentInit() {


  var svgArray = this.testMapService.initSvg(this.svg, this.width, this.height, this.path, this.circle, this.linkword, this.circleNextMap, this.toNextMapRect, this.linkwords, this.toNextMapButton);

  //  this.svg = this.buildMapService.initSvg(this.svg, this.width, this.height)
  this.svg = svgArray[0];
  // add the svg<g> element to group svg shapes together
  this.path = svgArray[1];
  this.circle = svgArray[2];
  this.linkword = svgArray[3];
  this.circleNextMap = svgArray[4];
  this.toNextMapRect = svgArray[5];
  this.randomItem = this.testMapService.random_item(this.nodes.length)

    for(let i=0; i<this.randomItem.length;i++){
      this.svg.append('foreignObject')
        .attr('width',110)
        .attr('height',70)
        .attr('x',this.nodes[this.randomItem[i]].x-55)
        .attr('y',this.nodes[this.randomItem[i]].y-8)
        .append('xhtml:input')
        .attr('type','text')
        .attr('class','form-control')
        .style('height','10px')
        .style('font-size','1px')
        .attr('id',i.toString());
    };
// refresh after each mousedown and mouseup
    this.svg.on('mousedown', (dataItem, value, source) => this.mousedown(dataItem, value, source));
    this.restart();
    this.svg.on('mouseup', (dataItem) => this.mouseup(dataItem));
    this.restart();

  }

  mousedown(dataItem: any, value: any, source: any) {
    // when mouse down set this.svg as active
    this.svg.classed('active', true);

    this.restart();
  }

  mouseup(source: any) {

    console.log('mouseup');

    this.svg.classed('active', false);
    }

  submitAnswer(){
    var resultAnswer = {};
    for(let i=0; i < this.randomItem.length; i++){
      if((<HTMLInputElement>document.getElementById(i.toString())).value === this.nodes[this.randomItem[i]].text)
      {
        resultAnswer['node'+this.randomItem[i].toString()] = "true";
        document.getElementById(i.toString()).style.backgroundColor = 'aquamarine';
      }
      else {
        resultAnswer['node'+this.randomItem[i].toString()] = "false";
        document.getElementById(i.toString()).style.backgroundColor= 'lightSalmon';
      }
    }
    for(var key in resultAnswer){
      console.log(resultAnswer[key])
    }
    (<HTMLInputElement>document.getElementById('submitBlock')).disabled = true;
    this.testMapService.callServer('variable',resultAnswer, "blocktest");
  }

delayNavigation() {
  this.router.navigate([this.routerLink]);
}



// refresh function
  restart() {

var offset = 0;

var buildMap = this.testMapService.buildMicroMap(this.svg, this.path, this.links,  this.circle, this.nodes, this.linkword, this.linkwords,  this.nodesNextMap, this.circleNextMap, offset);

this.svg  = buildMap[0];



this.circle = buildMap[1];
this.circle.merge(this.circle);
this.path = buildMap[2];
this.path.merge(this.path);

this.linkword = buildMap[3];
this.linkword.merge(this.linkword);
this.circleNextMap = buildMap[4];
this.circleNextMap.merge(this.circleNextMap);


this.routerLink = buildMap[5];
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


