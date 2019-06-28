import * as d3 from 'd3';
import { RouterLink } from '@angular/router';


export class TestMapService{

  initSvg(svg, width, height, path, circle, linkword, circleNextMap, toNextMapRect, linkwords, toNextMapButton) : any[]{
    svg = d3.select('svg')
    .attr('oncontextmenu', 'return false;')
    .attr('width', width)
    .attr('height', height)
    .attr('ready', false)
  

  // arrow styles
    svg.append('svg:defs').append('svg:marker')
    .attr('id', 'end-arrow')
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 6)
    .attr('markerWidth', 3)
    .attr('markerHeight', 3)
    .attr('orient', 'auto')
    .append('svg:path')
    .attr('d', 'M0,-5L10,0L0,5')
    .attr('fill', '#000');

    svg.append('svg:defs').append('svg:marker')
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
    path = svg.append('svg:g').selectAll('path.link');
    circle = svg.append('svg:g').selectAll('g');

    circleNextMap = svg.append('svg:g').selectAll('gNextMap');
    // circleNextMap = svg.append('svg:g').selectAll('g');

    linkword = svg.append('svg:g').selectAll('text.linkword');






// link word should only be created once, therefore moved into ngAfterInit 
       // create link words
       linkword = linkword.data(linkwords, (d) => d.id);
       linkword.exit().remove();
       // const g1 = linkword.enter().append('svg:g');
      
       linkword = linkword.enter()
       .append('svg:g')
       .attr('class', 'linkword')
       .attr('x', (d) => d.x)
       .attr('y', (d) => d.y)
       .attr('length', (d) => d.text.length)
       .merge(linkword)
       ;
   
       svg.selectAll('g.linkword')
       .append('svg:ellipse')
       .attr('class', 'linkword')
       .attr('cx', (d) => d.x )
       .attr('cy', (d) => d.y-1 )
       .attr('rx', '10')
       .attr('ry', '10')
       .attr('fill', 'lightgrey')
       ;
      
       svg.selectAll('g.linkword')
       .append('svg:text')
       .attr('class', 'linkword')
       .attr('x', (d) => d.x)
       .attr('y', (d) => d.y)
       .attr('fill', 'red')
       .attr('font-size', '5')
       .attr('text-anchor', 'middle')
       .text((d) => d.text)
       ;


     console.log(linkwords.length);
    for(var id = 0;id<parseInt(linkwords.length);id++){
      var textLength = svg.selectAll('g.linkword').filter(function(a,i){
       return i===id}).attr('length');
      //  console.log(parseInt(textLength)+1);
       svg.selectAll('ellipse.linkword').filter(function(a,i){
        return i===id;}).attr('rx', parseInt(textLength)*2.5+8)
    }





// create rectangular for asking if switch to the next map
    toNextMapRect = svg.append('rect')
    .attr('class', 'toNext')
    .attr('x', '200')
    .attr('y', '100')
    .attr('width', '800')
    .attr('height', '120')
    .attr('rx', '30')
    .attr('ry', '30')
    .style('fill', 'yellow')
    .style('opacity', '0.9')
    .attr('visibility', 'hidden')
    ;

    toNextMapRect = svg.append('svg:text')
    .attr('class', 'toNext')
    .attr('x', '460')
    .attr('y', '140')
    .attr('font-size', '30px')
    .attr('text-anchor', 'left')
    .attr('fill', 'purple')
    .text('Go to next map?')
    .attr('visibility', (d)=>{
        return svg.select('rect.toNext').attr('visibility');
      }
    )
    ;

    toNextMapButton = svg.append('svg:rect')
    .attr('class', 'button')
    .attr('x', '320')
    .attr('y', '170')
    .attr('width', '150')
    .attr('height', '30')
    .attr('rx', '5')
    .attr('ry', '5')
    .style('opacity', '0.9')
    .attr('fill', 'green')
    .attr('visibility', (d)=>{
        return svg.select('rect.toNext').attr('visibility');
      }
    )
    .on('mousedown', (d)=>{
      svg.select('text.toNext').attr('routerLink', '/page3');
   })
    ;

    toNextMapButton = svg.append('svg:rect')
    .attr('class', 'button')
    .attr('x', '690')
    .attr('y', '170')
    .attr('width', '150')
    .attr('height', '30')
    .attr('rx', '5')
    .attr('ry', '5')
    .style('opacity', '0.9')
    .attr('fill', 'red')
    .attr('visibility', (d)=>{
        return svg.select('rect.toNext').attr('visibility');
      }
    )
    .on('mousedown',(d)=>{
      svg.select('rect.toNext').attr('visibility', 'hidden');
      svg.select('text.toNext').attr('visibility', 'hidden');
      svg.selectAll('rect.button').attr('visibility', 'hidden');
    })
    ;





    return [svg, path, circle, linkword, circleNextMap, toNextMapRect];
    
  }


  buildMicroMap(svg, path, links, circle, nodes, linkword, linkwords,  nodesNextMap, circleNextMap, offset) : any[]{
    
    // svg.select('text.toNext').attr('font-size', '30px')
    // .attr('visibility', (d)=>{
    //   return svg.select('rect.toNext').attr('visibility');
    // });
    
    
    // bind the paths with data
    path = path.data(links);
    // bind the white rectangulars with data
    
        path.exit().remove();
    
      // create paths
      path = path
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
        let sourcePadding = 8;
    
        let targetPadding = 0;


        targetPadding = 0;
        sourcePadding = 0;
        
    
    
        // const targetPadding = d.right ? 27-0.5*(2-xy) : 17-0.5*(2-xy);
        const sourceX = d.source.x + (sourcePadding * normX);
        const sourceY = d.source.y + (sourcePadding * normY);
        const targetX = d.target.x - (targetPadding * normX);
        const targetY = d.target.y - (targetPadding * normY);
    // calculate the d attribute for path
        return `M${sourceX},${sourceY}L${targetX},${targetY}`;
      })
      // set arrow style
      .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
      .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '')
      .merge(path);
    
   
    // bind the circle with data
      circle = circle.data(nodes, (d) => d.id);
      circle.exit().remove();

      circleNextMap = circleNextMap.data(nodesNextMap, (d) => d.id);
      circleNextMap.exit().remove();
    
    // for each node create a g element
    const g = circle.enter().append('svg:g');

    const gNextMap = circleNextMap.enter().append('svg:g');



    gNextMap.append('svg:ellipse')
    .attr('class', 'nodeNextMap')
    .attr('rx', 55)
    .attr('ry', 20)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    // .attr('fill',(d) => d.id===0? 'red': 'black')
    .style('fill', (d) => 'grey')
    .style('opacity', '0.9')
    .style('stroke', 'white')
    .on('mousedown', (d)=>{
      svg.select('rect.toNext').attr('visibility', 'visible');
      svg.select('text.toNext').attr('visibility', 'visible');
      svg.selectAll('rect.button').attr('visibility', 'visible');
    })
    ;
    
    
    // create ellipses
    g.append('svg:ellipse')
    .attr('class', 'node')
    .attr('rx', 55)
    .attr('ry', 20)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    // .attr('fill',(d) => d.id===0? 'red': 'black')
    .style('fill', (d) => 
    {
      return 'green';
    }
    )
    .style('stroke', (d) => (!d.reflexive) ? 'black' : 'white')
    .on('mousedown', (d) => {
    
      // this code is needed for initialize the mousedown function before dragging the slider bar
      if(parseInt(svg.select('circle.ball').attr('cx'))===900){
        window.alert("Node locked");
      }
      else{    
      }
      
      })
      // .on('mouseover', (d)=>{
      //   d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
      //     return a['id']===d.id;
      //   })
      //   .style('fill','lightgreen')
      // })
      // .on('mouseout', (d)=>{
      //   d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
      //     return a['id']===d.id;
      //   })
      //   .style('fill','green');
      // });
    
 
    // create texts
    g.append('svg:text')
    .attr('class', 'eText')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('fill', 'white')
    .attr('font-size', '5')
    .attr('text-anchor', 'middle')
    .text((d) => d.text);

    gNextMap.append('svg:text')
    .attr('class', 'eTextNextMap')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('fill', 'white')
    .attr('font-size', '5')
    .attr('text-anchor', 'middle')
    .text((d) => d.text);
    
    circleNextMap = gNextMap.merge(circleNextMap);
    circleNextMap.exit().remove();


    circle = g.merge(circle);
    circle.exit().remove(); 
    
    

    var routerLink = svg.select('text.toNext').attr('routerLink');
    // console.log(routerLink);

    return [svg, circle, path, linkword, circleNextMap, routerLink];
    
    
      }
  }




