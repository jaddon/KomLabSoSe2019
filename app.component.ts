import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import {style} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'KomTest';

  @ViewChild('graphContainer') graphContainer: ElementRef;

  width = 1240;
  height = 570;
  k = 1;
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  clickOnNode = false;
  svg: any;
  circle: any;
  path: any;
  centered: any;
  centerx: any;
  centery: any;
  info: any;

  selectedNode = null;
  selectedLink = null;
  mousedownLink = null;
  mousedownNode = null;
  mouseupNode = null;

  // store the nodes
  nodes = [
    { id: 0, text: 'java', x: 300, y: 70, reflexive: false },
    { id: 1, text: 'computer science', x: 150, y: 100, reflexive: false },
    { id: 2, text: 'program', x: 250, y: 300, reflexive: false },
    { id: 3, text: 'variable', x: 350, y: 275, reflexive: false },
    { id: 4, text: 'primitive type', x: 430, y: 240, reflexive: false },
    { id: 5, text: 'object', x: 520, y: 180, reflexive: false },
    { id: 6, text: 'class', x: 500, y: 120, reflexive: false },
    { id: 7, text: 'method', x: 520, y: 50, reflexive: false },
  ];

  // store the links
  links = [
    { source: this.nodes[0], target: this.nodes[1], left: false, right: true },
    { source: this.nodes[0], target: this.nodes[2], left: false, right: true },
    { source: this.nodes[0], target: this.nodes[3], left: false, right: true },
    { source: this.nodes[0], target: this.nodes[4], left: false, right: true },
    { source: this.nodes[0], target: this.nodes[5], left: false, right: true },
    { source: this.nodes[0], target: this.nodes[6], left: false, right: true },
    { source: this.nodes[0], target: this.nodes[7], left: false, right: true },
  ];

  // store the white rectangulars as simulation for text fields
  infos = [
    {text: 'map0', target: this.nodes[0], hidden: true},
    {text: 'map1', target: this.nodes[1], hidden: true},
    {text: 'map2', target: this.nodes[2], hidden: true},
    {text: 'map3', target: this.nodes[3], hidden: true},
    {text: 'map4', target: this.nodes[4], hidden: true},
    {text: 'map5', target: this.nodes[5], hidden: true},
    {text: 'map6', target: this.nodes[6], hidden: true},
    {text: 'map7', target: this.nodes[7], hidden: true},
  ];


  ngAfterContentInit() {
    const rect = this.graphContainer.nativeElement.getBoundingClientRect();



    this.svg = d3.select('#graphContainer')
    .attr('oncontextmenu', 'return false;')
    .attr('width', this.width)
    .attr('height', this.height);



  // arrow styles
    this.svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');

    this.svg.append('svg:defs').append('svg:marker')
    .attr('id', 'start-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 4)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M10,-5L0,0L10,5')
    .attr('fill', '#000');



  // add the svg<g> element to group svg shapes together
    this.path = this.svg.append('svg:g').selectAll('path');
    this.circle = this.svg.append('svg:g').selectAll('g');
    this.info = this.svg.append('svg:g').selectAll('rect');


// refresh after each mousedown and mouseup
    this.svg.on('mousedown', (dataItem, value, source) => this.mousedown(dataItem, value, source));
    this.restart();
    this.svg.on('mouseup', (dataItem) => this.mouseup(dataItem));
    this.restart();

  }

  mousedown(dataItem: any, value: any, source: any) {
    // when mouse down set this.svg as active
    this.svg.classed('active', true);



    if (this.clickOnNode === false) {
      // if (this.mousedownNode === this.selectedNode || this.mousedownNode === null) {
        // if click on the same node once again or click on the background, then not zooming
         this.centered = null;
         this.selectedNode = null;
         this.centerx = this.width / 2;
         this.centery = this.height / 2;
         this.k = 1;
         this.svg.transition()
        .duration(750)
        .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')scale(' + this.k + ')translate(' + -this.centerx + ',' + -this.centery + ')');
         console.log('this is my : ' + this.selectedNode );
         this.restart();
      // }
    }

    this.restart();
  }

  mouseup(source: any) {
    // when mouseup, set the svg background as inactive
    this.svg.classed('active', false);

    // clear mouse event vars
    this.mousedownNode = null;
    this.mouseupNode = null;
    this.mousedownLink = null;
    this.clickOnNode = false;


    // remove all white rectangulars when the scale is 1
    if (this.k === 1) {
      this.svg.selectAll('rect').remove();
    }
}

// refresh function
  restart() {

// bind the paths with data
    this.path = this.path.data(this.links);
// bind the white rectangulars with data
    this.info = this.info.data(this.infos);

    this.path.exit().remove();



  // create paths
  this.path = this.path
  .enter()
  .append('svg:path')
  .attr('class', 'link')
  .attr('d', (d) => {
    const deltaX = d.target.x - d.source.x;
    const deltaY = d.target.y - d.source.y;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const normX = deltaX / dist;
    const normY = deltaY / dist;
    const xy = Math.abs(deltaX / deltaY);
    const sourcePadding = 0;

    let targetPadding = 0;

    if (Math.abs(d.source.x - d.target.x) > 10*Math.abs(d.source.y - d.target.y) || Math.abs(d.source.x - d.target.x) === 10*Math.abs(d.source.y - d.target.y)){
      
      targetPadding = d.right ? 27-0.25*(2-xy) : 17-0.25*(2-xy);
      // targetPadding = d.right ? 27-800000*(2-xy)*Math.pow((dist/2310),5) : 17-400000*(2-xy)*Math.pow((dist/2310),5);
    }

    else if (Math.abs(d.source.x - d.target.x) > 3*Math.abs(d.source.y - d.target.y) || (Math.abs(d.source.x - d.target.x) === 3*Math.abs(d.source.y - d.target.y))){
      targetPadding = d.right ? 27-0.8*(2-xy) : 17-0.8*(2-xy);
    }

    else if (Math.abs(d.source.x - d.target.x) < 3*Math.abs(d.source.y - d.target.y)){     
      targetPadding = d.right ? 27-4*(2-xy) : 17-2*(2-xy);
    }


    // const targetPadding = d.right ? 27-0.5*(2-xy) : 17-0.5*(2-xy);
    const sourceX = d.source.x + (sourcePadding * normX);
    const sourceY = d.source.y + (sourcePadding * normY);
    const targetX = d.target.x - (targetPadding * normX);
    const targetY = d.target.y - (targetPadding * normY);
// calculate the d attribute for path
    return `M${d.source.x},${d.source.y}L${targetX},${targetY}`;
  })
  // set arrow style
  .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
  .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '')
  .merge(this.path);


 this.info.exit().remove();

    this.info = this.info
      .enter()
      .append('svg:rect')
      .attr('class', 'info')
      .attr('x', (d) => d.target.x)
      .attr('y', (d) => d.target.y)
      .attr('fill', 'white')
      .attr('width', '60')
      .attr('height', '80')
      .attr('visibility', (d) => d.hidden ? 'hidden' : 'visible');



// bind the circle with data
  this.circle = this.circle.data(this.nodes, (d) => d.id);
  // create ellipses
  this.circle.selectAll('ellipse')
  .style('fill', (d) => (d === this.selectedNode) ? d3.rgb(this.colors(d.id)).brighter().toString() : this.colors(d.id))
  .style('stroke', (d) => (d === this.selectedNode) ? 'black' : 'white');


  this.circle.exit().remove();

// for each ellipse create a g element
const g = this.circle.enter().append('svg:g');


// create ellipses
g.append('svg:ellipse')
.attr('class', 'node')
.attr('rx', 25)
.attr('ry', 15)
.attr('cx', (d) => d.x)
.attr('cy', (d) => d.y)
// .attr('fill',(d) => d.id===0? 'red': 'black')
.style('fill', (d) => (d === this.selectedNode) ? d3.rgb(this.colors(d.id)).brighter().toString() : this.colors(d.id))
.style('stroke', (d) => (d === this.selectedNode) ? 'black' : 'white')
.on('mousedown', (d) => {

  // select node
  this.mousedownNode = d;
  this.selectedNode = (this.mousedownNode === this.selectedNode) ? null : this.mousedownNode;


  // if click on the same node twice, focus and zoom will be reset
  this.centerx = this.centered !== d ? d.x : this.width / 2;
  this.centery = this.centered !== d ? d.y : this.height / 2;
  this.k = this.centered !== d ? 3 : 1;
  this.centered = this.centered !== d ? d : null;
  this.clickOnNode = true;

  for (let i = 0; i < this.infos.length; i++) {
    this.infos[i].hidden = true;
  }

  this.svg.selectAll('rect').remove();


  if (this.k === 3) {
    this.infos[d.id].hidden = false;
  }

  this.restart();

  this.svg.transition()
  .duration(750)
  .attr('transform', 'translate(' + this.width * this.k / 2  + ',' + this.height * this.k / 2 + ')scale(' + this.k + ')translate(' + -this.centerx + ',' + -this.centery + ')');
  });




// create texts
g.append('svg:text')
.attr('class', 'text')
.attr('x', (d) => d.x)
.attr('y', (d) => d.y)
.attr('fill', 'white')
.attr('font-size', '5')
.attr('text-anchor', 'middle')
.text((d) => d.text);

this.circle = g.merge(this.circle);


for (let i = 0; i < this.infos.length; i++) {
  this.infos[i].hidden = true;
}
  }
}
