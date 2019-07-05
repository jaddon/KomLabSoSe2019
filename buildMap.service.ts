import * as d3 from 'd3';
import { RouterLink } from '@angular/router';
import { Injectable } from '@angular/core';
import { TestMapService } from './testMap.service';
import { rgb } from 'd3';


@Injectable()
export class BuildMapService{

  constructor(private testMapService: TestMapService){}

    // wrap function for automatically breaking lines to fit the text field
  wrap(text: any, width: number) {

    text.each(function() {
      // let r = 0;
      var text = d3.select(this),
        words = text.text().split('').reverse(),
        word,
        line = [],
        lineNumber = 0,
        
        // this should be set manually, otherwise problem when continuelly click on different nodes
        lineHeight = 5,
        // lineHeight = text.node().getBoundingClientRect().height,
        x = +text.attr('x'),
        y = +text.attr('y'),
        
        tspan = text.text(null).append('tspan').attr('x', x).attr('y', y);
  
        
      while (word = words.pop()) {
        line.push(word);
        const dash = lineNumber > 0 ? '-' : '';
        tspan.text(dash + line.join(''));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(''));
          line = [word];
          tspan = text.append('tspan').attr('x', x).attr('y', ++lineNumber * lineHeight + y).text(word);
        }
      }
      
    }
    );
  }

  initSvg(svg, width, height, path, circle, linkword, glossary, gText, gImage, sliderCircle, circleNextMap, toNextMapRect, linkwords, toNextMapButton, gButton) : any[]{
    svg = d3.select('svg')
    .attr('oncontextmenu', 'return false;')
    .attr('width', width)
    .attr('height', height)
    .attr('ready', false)

      // var logo = svg. append('image') . attr('xlink:href', 'assets/icon.jpg') . attr('width', 100) . attr('height', 50);

    svg.select('foreignObject.pdf').attr('visibility', 'hidden');
  

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
    glossary = svg.append('svg:g').selectAll('rect.gRect');

    gText = svg.append('svg:g').selectAll('text.gText')
    gImage = svg.append('svg:g').selectAll('image.gImage');
    gButton = svg.append('svg:g').selectAll('foreignObject.gButton');
    ;






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
       .attr('visibility','hidden')
       ;
      
       svg.selectAll('g.linkword')
       .append('svg:text')
       .attr('class', 'linkword')
       .attr('x', (d) => d.x)
       .attr('y', (d) => d.y)
       .attr('fill', 'red')
       .attr('font-size', '5')
       .attr('text-anchor', 'middle')
       .attr('visibility','hidden')
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




// create slider bar
    var data = [1,2,3];
    var scale = d3.scaleLinear()
                  .domain([1, d3.max(data)])
                  .range([0, 200]);
    var x_axis = d3.axisBottom(scale)
    .ticks(2, "f");

    svg.append("g")
       .attr('class','slider')
       .attr("transform", "translate(1000, 10)")
       .call(x_axis);

// create ball on the slider bar
    sliderCircle = svg.append("circle")
    .attr('class', 'ball')
    .attr("cx", 1000)
    .attr("cy", 10)
    .attr("r", 7)
    .style("fill", "purple")

    svg
    .append('svg:text')
    .attr('class','slider')
    .attr('x',880)
    .attr('y',16)
    .attr('text-anchor', 'left')
    // .attr('fill', 'purple')
    .text('Difficult Level:')




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

    toNextMapButton = svg.append('foreignObject')
    .attr('class', 'toNext')
    .attr('x', '320')
    .attr('y', '150')
    .attr('width', '150')
    .attr('height', '60')
    .attr('visibility', (d)=>{
      return svg.select('rect.toNext').attr('visibility');
    }
  )
  .on('mousedown', (d)=>{
    svg.select('text.toNext').attr('routerLink', d3.select('rect.toNext').attr('link'));
 })
  ;
    ;

    toNextMapButton
    .append('xhtml:div')
    .attr('class','button')
    .html('<button type="button" class="btn btn-success btn-lg btn-block">Yes</button>')



    toNextMapButton = svg.append('foreignObject')
    .attr('class', 'toNext')
    .attr('x', '690')
    .attr('y', '150')
    .attr('width', '150')
    .attr('height', '60')
    .attr('visibility', (d)=>{
      return svg.select('rect.toNext').attr('visibility');
    }
  )
  .on('mousedown',(d)=>{
    svg.select('rect.toNext').attr('visibility', 'hidden');
    svg.select('text.toNext').attr('visibility', 'hidden');
    svg.selectAll('foreignObject.toNext').attr('visibility', 'hidden');
  })
  ;

    toNextMapButton
    .append('xhtml:div')
    .attr('class','button')
    .html('<button type="button" class="btn btn-danger btn-lg btn-block">No</button>')






    return [svg, path, circle, linkword, glossary, gText, gImage, sliderCircle, circleNextMap, toNextMapRect, gButton];
    
  }


  buildMicroMap(svg, path, links, glossary, glossaries, gText, gTexts, gImage, gButton, circle, nodes, linkword, linkwords, sliderCircle, nodesNextMap, circleNextMap, offset, mapName) : any[]{
    

    

    // bind the paths with data
    path = path.data(links);
    // bind the white rectangulars with data
        glossary = glossary.data(glossaries);
    
        gText = gText.data(gTexts);
    
        gImage = gImage.data(gTexts);

        gButton =gButton.data(gTexts);
    
    
        path.exit().remove();
    
      // create paths
      path = path
      .enter()
      .append('svg:path')
      .attr('class', 'link')
      .attr('visibility','hidden')
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
    .attr('link',(d)=>d.link)
    // .attr('fill',(d) => d.id===0? 'red': 'black')
    .style('fill', (d) => 'grey')
    .style('opacity', '0.9')
    .style('stroke', 'white')
    .on('mousedown', function(){
      svg.select('rect.toNext').attr('visibility', 'visible');
      svg.select('rect.toNext').attr('link',d3.select(this).attr('link'));
      svg.select('text.toNext').attr('visibility', 'visible');
      svg.selectAll('foreignObject.toNext').attr('visibility', 'visible');
    })
    ;
    
    
    // create ellipses
    g.append('svg:ellipse')
    .attr('class', 'node')
    .attr('rx', 55)
    .attr('ry', 20)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('visibility','hidden')
    .attr('level',(d)=>d.level)
    // .attr('fill',(d) => d.id===0? 'red': 'black')
    .style('fill', (d) => 
    {
      return 'grey';
    }
    )
    .style('stroke', (d) => (!d.reflexive) ? 'black' : 'white')
    .attr('locked','true')
    .on('mousedown', (d) => {
    
      // this code is needed for initialize the mousedown function before dragging the slider bar
      if(parseInt(svg.select('circle.ball').attr('cx'))===1000){


        if(parseInt(d.level)>1){
          window.alert("Node locked");
        }
        else{
          
        var id = d['id'];
    
    
        if(d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
          return i===id}).attr('visibility')==='hidden'){
            d3.select('svg').attr('clickOnNode', 'true');
          }
          else{
            d3.select('svg').attr('clickOnNode', 'false');
          }



        d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
          return i===id}).attr('visibility', 
          d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
            return i===id}).attr('visibility')==='hidden'?'visible':'hidden'
          );
        d3.select('svg').selectAll('text.gText').filter(function(a,i){
            return i===id}).attr('visibility', 
            d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
              return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
          );
          d3.select('svg').selectAll('image.gImage').filter(function(a,i){
            return i===id}).attr('visibility', 
            d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
              return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
          );

          d3.select('svg').selectAll('foreignObject.gButton').filter(function(a,i){
            return i===id}).attr('visibility', 
            d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
              return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
          );

          d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
            return i!==id}).attr('visibility', 
            'hidden'
            );
          d3.select('svg').selectAll('text.gText').filter(function(a,i){
              return i!==id}).attr('visibility', 
              'hidden'
              );
          d3.select('svg').selectAll('image.gImage').filter(function(a,i){
                return i!==id}).attr('visibility', 
                'hidden'
                );
          d3.select('svg').selectAll('foreignObject.gButton').filter(function(a,i){
                return i!==id}).attr('visibility', 
                'hidden'
                );

    var k = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
      return i===id}).attr('visibility')==='hidden')?1:3;

      // console.log(k);

      var x = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
        return i===id}).attr('visibility')==='hidden')?620:d['x'];

      var y = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
          return i===id}).attr('visibility')==='hidden')?240:d['y'];

          d3.select('svg').transition()
          .duration(750)
          .attr('transform', 'translate(' + (1240 + 2*offset) * k / 2  + ',' + 480 * k / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');

        
        }
      }
      else{          
      }
      
      })
      .on('mouseover', (d)=>{
        d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
          return a['id']===d.id;
        })
        .style('stroke', (d) => 'black')
        .style('stroke-width', '3px')
      })
      .on('mouseout', (d)=>{
        d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
          return a['id']===d.id;
        })
        .style('stroke', (d) => 'white')
        .style('stroke-width', '1.5px')
      });


      this.testMapService.callServerTest().subscribe(data=>{
        if(parseInt(svg.select('circle.ball').attr('cx'))===1000){
          d3.select('svg').selectAll('ellipse.node').attr('visibility','hidden');
          d3.select('svg').selectAll('text.eText').attr('visibility','hidden');
          d3.select('svg').selectAll('path.link').attr('visibility','hidden');
          d3.select('svg').selectAll('ellipse.linkword').attr('visibility','hidden');
          d3.select('svg').selectAll('text.linkword').attr('visibility','hidden');

          var nodeIds = [];

        for(var t = 0; t<nodes.length; t++){
      
      
         if( parseInt(d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
            return a['id']===t;
          }).attr('level'))===1){

            nodeIds.push(t);

            d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
              return a['id']===t;
            })
            .attr('visibility','visible')
            .style('fill',(d)=>{
              var correct = parseInt(data[mapName]['blocktest']['node'+t]['true']);
              var wrong = parseInt(data[mapName]['blocktest']['node'+t]['false']);
      
              if(correct===0&&wrong===0){
                return rgb(125,0,0).toString();
              }
              else if(correct===wrong){
                return rgb(125,125,0).toString();
              }
              else if(correct>wrong){
                return rgb(125*wrong/correct,125,0).toString();
              }
              else{
                return rgb(125,125*correct/wrong,0).toString();
              }
            })

            d3.select('svg').selectAll('text.eText').filter(function(a,i){
              return a['id']===t;
            })
            .attr('visibility','visible')
          }
          else{
            d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
              return a['id']===t;
            })
            .style('fill','grey')
          }  
        }

        for(var i = 0; i<links.length; i++){
            if(links[i].id.split(' ')[0].split('a')[1]!==undefined){
              if(nodeIds.includes(parseInt(links[i].id.split(' ')[0].split('a')[1]))
                 && links[i].id.split(' ')[1].split('b')[1]!==undefined){

                var id = parseInt(links[i].id.split(' ')[1].split('b')[1]);

                for(var j = 0; j<links.length; j++){
                  if(links[j].id.split(' ')[0].split('b')[1]!==undefined){
                    if(parseInt(links[j].id.split(' ')[0].split('b')[1])===id){
                      if(links[j].id.split(' ')[1].split('a')[1]!==undefined){
                        if(nodeIds.includes(parseInt(links[j].id.split(' ')[1].split('a')[1]))){

                          console.log(id);
                          d3.select('svg').selectAll('ellipse.linkword').filter(function(a,i){
                            return a['id']===id;
                          }).attr('visibility','visible')
                          d3.select('svg').selectAll('text.linkword').filter(function(a,i){
                            return a['id']===id;
                          }).attr('visibility','visible')

                          d3.select('svg').selectAll('path.link').filter(function(a,t){
                            return t===i;
                          }).attr('visibility','visible')
                          d3.select('svg').selectAll('path.link').filter(function(a,t){
                            return t===j;
                          }).attr('visibility','visible')

                        }
                      }
                    }
                  }
                }
              }
            }
        }
      }
     })
    
    
 
    // create texts
    g.append('svg:text')
    .attr('class', 'eText')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('fill', 'white')
    .attr('font-size', '5')
    .attr('text-anchor', 'middle')
    .attr('visibility','hidden')
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
    
    glossary.exit().remove();
    
    
        glossary = glossary
          .enter()
          .append('svg:rect')
          .attr('class', 'gRect')
          .attr('x', (d) => { if(d.target.x+60<=svg.attr('width')){
               return d.target.x;}
               else{
                 return d.target.x-60;
               }
          })
          .attr('y', (d) => {if(d.target.y+80<=svg.attr('height')){
              return d.target.y;
           }
           else{
               return d.target.y-80;

           }})
          .attr('fill', 'orange')
          .attr('width', '60')
          .attr('height', '80')
          .attr('visibility', (d) => d.hidden ? 'hidden' : 'visible')
          .attr('stroke', 'black')
          // .on('mousedown', (d)=>{
          //   d3.select('svg').attr('clickOnNode', 'true');
          //   svg.select('foreignObject.pdf')
          //   .attr('visibility','visible')
          //   .transition()
          //   .duration(0)
          //   .attr('transform', 'translate('+ (d.target.x-180) + ", 0)");

          //   // make sure that the pdf view will be fixed on the top of page
          //     svg.transition().duration(0).attr('transform','translate(' + (1240 + 2*offset) * 3 / 2  + ',' + (310+d.target.y*2) * 3 / 2 + ')scale(' + 3 + ')translate(' + -d.target.x + ',' + -d.target.y + ')');
            
          //   // make sure the pdf could be fully shown even if click on node on the left border
          //   if(d.target.x<150){
          //     svg.select('foreignObject.pdf')
          //     .attr('visibility','visible')
          //     .transition()
          //     .duration(0)
          //     .attr('transform', 'translate('+ (d.target.x-65) + ", 0)");
          //     svg.transition().duration(0).attr('transform','translate(' + (1240 + 2*offset - 65*3) * 3 / 2  + ',' + (310+d.target.y*2) * 3 / 2 + ')scale(' + 3 + ')translate(' + -d.target.x + ',' + -d.target.y + ')');
          //   }

          //   svg.attr('page', parseInt(d.page)+18);
          //   console.log("current page: " + d.page);
            
          // })
          .merge(glossary)
          ;
          
          gText.exit().remove();
    
          gImage.exit().remove();
    
    
    
    
    gText = gText
    .enter()
    .append('svg:text')
    .attr('class', 'gText')
    .attr('x', (d) => { if(d.target.x+60<=svg.attr('width')){
      return d.target.x+10;}
      else{
        return d.target.x-50;
      }
 })
    .attr('y', (d) => {if(d.target.y+80<=svg.attr('height')){
        return d.target.y+10;
     }
     else{
         return d.target.y-70;
     }})
    .attr('fill', 'black')
    .attr('font-size', '4')
    .attr('text-anchor', 'left')
    .attr('visibility', (d) => d.hidden ? 'hidden' : 'visible')
    .text((d) => d.text)
    .call(this.wrap,40)
    .on('mousedown', (d)=>{

    })
    .merge(gText);
    ;
    
    gImage = gImage
    .enter()
    .append('svg:image')
    .attr('class', 'gImage')
    .attr('x', (d) => { if(d.target.x+60<=svg.attr('width')){
      return d.target.x+10;}
      else{
        return d.target.x-50;
      }
 })
    .attr('y', (d) => {if(d.target.y+80<=svg.attr('height')){
        return d.target.y+60;
     }
     else{
         return d.target.y-20;
     }})
    .attr('xlink:href', 'assets/icon.jpg')
    .attr('width', 20)
    .attr('height', 15)
    .attr('visibility', (d) => d.hidden ? 'hidden' : 'visible')
    .merge(gImage)
    ;
    
    

    gButton = gButton
    .enter()
    .append('foreignObject')
    .attr('class', 'gButton')
    .attr('visibility', 'hidden')
    .attr("width", 50)
    .attr("height", 25)
    .attr('x', (d) => { if(d.target.x+60<=svg.attr('width')){
      return d.target.x+15;}
      else{
        return d.target.x-45;
      }
 })
    .attr('y', (d) => {if(d.target.y+80<=svg.attr('height')){
        return d.target.y+50;
     }
     else{
         return d.target.y-30;
     }})
     .on('mousedown', (d)=>{
      d3.select('svg').attr('clickOnNode', 'true');
      svg.select('foreignObject.pdf')
      .attr('visibility','visible')
      .transition()
      .duration(0)
      .attr('transform', 'translate('+ (d.target.x-180) + ", 0)");

      // make sure that the pdf view will be fixed on the top of page
        svg.transition().duration(0).attr('transform','translate(' + (1240 + 2*offset) * 3 / 2  + ',' + (310+d.target.y*2) * 3 / 2 + ')scale(' + 3 + ')translate(' + -d.target.x + ',' + -d.target.y + ')');
      
      // make sure the pdf could be fully shown even if click on node on the left border
      if(d.target.x<150){
        svg.select('foreignObject.pdf')
        .attr('visibility','visible')
        .transition()
        .duration(0)
        .attr('transform', 'translate('+ (d.target.x-65) + ", 0)");
        svg.transition().duration(0).attr('transform','translate(' + (1240 + 2*offset - 65*3) * 3 / 2  + ',' + (310+d.target.y*2) * 3 / 2 + ')scale(' + 3 + ')translate(' + -d.target.x + ',' + -d.target.y + ')');
      }

      svg.attr('page', parseInt(d.page)+18);
      console.log("current page: " + d.page);
      
    })
     .append('xhtml:div')
     .attr('class','button')
     .html('<button type="button" class="btn btn-link btn-sm">Book</button>')
     .merge(gButton)
    ;
    
    
    
    

    var testMapService = this.testMapService;
    
  
    
        sliderCircle.call(d3.drag()
         .on('start', function(d) {
          d3.event.sourceEvent.stopPropagation();
          d3.select(this)
            .classed("dragging", true);
         })
         .on('drag', function(d) {
          d3.select(this).attr("cx", 
          (d)=>{
            // console.log(this);
            if(d3.event.x<=1050){
              return 1000;
            }
            else if(d3.event.x<=1150){
              return 1100;
            }
            else{
              return 1200;
            }
          })
          d3.select(this).attr("cy", 10);
    
          var cx = parseInt(d3.select(this).attr('cx'));
           if(cx===1000){
    
    
              d3.select('svg').attr('clickOnNode', 'false');
    
              d3.select('svg').selectAll('ellipse.node').attr('locked', 'false');

              testMapService.callServerTest().subscribe(data=>{
                if(parseInt(svg.select('circle.ball').attr('cx'))===1000){
                  d3.select('svg').selectAll('ellipse.node').attr('visibility','hidden');
                  d3.select('svg').selectAll('text.eText').attr('visibility','hidden');
                  d3.select('svg').selectAll('path.link').attr('visibility','hidden');
                  d3.select('svg').selectAll('ellipse.linkword').attr('visibility','hidden');
                  d3.select('svg').selectAll('text.linkword').attr('visibility','hidden');
        
                  var nodeIds = [];
        
                for(var t = 0; t<nodes.length; t++){
              
              
                 if( parseInt(d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                    return a['id']===t;
                  }).attr('level'))===1){
        
                    nodeIds.push(t);
        
                    d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                      return a['id']===t;
                    })
                    .attr('visibility','visible')
                    .style('fill',(d)=>{
                      var correct = parseInt(data[mapName]['blocktest']['node'+t]['true']);
                      var wrong = parseInt(data[mapName]['blocktest']['node'+t]['false']);
              
                      if(correct===0&&wrong===0){
                        return rgb(125,0,0).toString();
                      }
                      else if(correct===wrong){
                        return rgb(125,125,0).toString();
                      }
                      else if(correct>wrong){
                        return rgb(125*wrong/correct,125,0).toString();
                      }
                      else{
                        return rgb(125,125*correct/wrong,0).toString();
                      }
                    })
        
                    d3.select('svg').selectAll('text.eText').filter(function(a,i){
                      return a['id']===t;
                    })
                    .attr('visibility','visible')
                  }
                  else{
                    d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                      return a['id']===t;
                    })
                    .style('fill','grey')
                  }  
                }
        
                for(var i = 0; i<links.length; i++){
                    if(links[i].id.split(' ')[0].split('a')[1]!==undefined){
                      if(nodeIds.includes(parseInt(links[i].id.split(' ')[0].split('a')[1]))
                         && links[i].id.split(' ')[1].split('b')[1]!==undefined){
        
                        var id = parseInt(links[i].id.split(' ')[1].split('b')[1]);
        
                        for(var j = 0; j<links.length; j++){
                          if(links[j].id.split(' ')[0].split('b')[1]!==undefined){
                            if(parseInt(links[j].id.split(' ')[0].split('b')[1])===id){
                              if(links[j].id.split(' ')[1].split('a')[1]!==undefined){
                                if(nodeIds.includes(parseInt(links[j].id.split(' ')[1].split('a')[1]))){
        
                                  console.log(id);
                                  d3.select('svg').selectAll('ellipse.linkword').filter(function(a,i){
                                    return a['id']===id;
                                  }).attr('visibility','visible')
                                  d3.select('svg').selectAll('text.linkword').filter(function(a,i){
                                    return a['id']===id;
                                  }).attr('visibility','visible')
        
                                  d3.select('svg').selectAll('path.link').filter(function(a,t){
                                    return t===i;
                                  }).attr('visibility','visible')
                                  d3.select('svg').selectAll('path.link').filter(function(a,t){
                                    return t===j;
                                  }).attr('visibility','visible')
        
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                }
              }
             })


              d3.select('svg').selectAll('ellipse.node').on('mousedown', (d)=>{
              // d3.select('svg').selectAll('ellipse.node').on('click', (d)=>{
                var id = d['id'];
    
    
                if(d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                  return i===id}).attr('visibility')==='hidden'){
                    d3.select('svg').attr('clickOnNode', 'true');
                  }
                  else{
                    d3.select('svg').attr('clickOnNode', 'false');
                  }
    
    
    
                d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                  return i===id}).attr('visibility', 
                  d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                    return i===id}).attr('visibility')==='hidden'?'visible':'hidden'
                  );
                d3.select('svg').selectAll('text.gText').filter(function(a,i){
                    return i===id}).attr('visibility', 
                    d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                  );
                  d3.select('svg').selectAll('image.gImage').filter(function(a,i){
                    return i===id}).attr('visibility', 
                    d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                  );

                  d3.select('svg').selectAll('foreignObject.gButton').filter(function(a,i){
                    return i===id}).attr('visibility', 
                    d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                  );
    
                  d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                    return i!==id}).attr('visibility', 
                    'hidden'
                    );
                  d3.select('svg').selectAll('text.gText').filter(function(a,i){
                      return i!==id}).attr('visibility', 
                      'hidden'
                      );
                  d3.select('svg').selectAll('image.gImage').filter(function(a,i){
                        return i!==id}).attr('visibility', 
                        'hidden'
                        );
                  d3.select('svg').selectAll('foreignObject.gButton').filter(function(a,i){
                        return i!==id}).attr('visibility', 
                        'hidden'
                        );
    
            var k = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
              return i===id}).attr('visibility')==='hidden')?1:3;

              // console.log(k);
    
              var x = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                return i===id}).attr('visibility')==='hidden')?620:d['x'];
    
              var y = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                  return i===id}).attr('visibility')==='hidden')?240:d['y'];
    
                  d3.select('svg').transition()
                  .duration(750)
                  .attr('transform', 'translate(' + (1240 + 2*offset) * k / 2  + ',' + 480 * k / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
    
    
           })
    
    
              d3.select('svg').selectAll('ellipse.node').filter(function(d, i){
                return d['level']>1}).style('fill','grey').attr('locked','true');
              d3.select('svg').selectAll('ellipse.node').filter(function(d, i){
                return d['level']>1}).on('mousedown', (d)=> window.alert("Node locked"))
            }
            else if(cx===1100){
    
    
              d3.select('svg').attr('clickOnNode', 'false');
    
              d3.select('svg').selectAll('ellipse.node').attr('locked','false');

              testMapService.callServerTest().subscribe(data=>{
                if(parseInt(svg.select('circle.ball').attr('cx'))===1100){
                  d3.select('svg').selectAll('ellipse.node').attr('visibility','hidden');
                  d3.select('svg').selectAll('text.eText').attr('visibility','hidden');
                  d3.select('svg').selectAll('path.link').attr('visibility','hidden');
                  d3.select('svg').selectAll('ellipse.linkword').attr('visibility','hidden');
                  d3.select('svg').selectAll('text.linkword').attr('visibility','hidden');
        
                  var nodeIds = [];
        
                for(var t = 0; t<nodes.length; t++){
              
              
                 if( parseInt(d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                    return a['id']===t;
                  }).attr('level'))<=2){
        
                    nodeIds.push(t);
        
                    d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                      return a['id']===t;
                    })
                    .attr('visibility','visible')
                    .style('fill',(d)=>{
                      var correct = parseInt(data[mapName]['blocktest']['node'+t]['true']);
                      var wrong = parseInt(data[mapName]['blocktest']['node'+t]['false']);
              
                      if(correct===0&&wrong===0){
                        return rgb(125,0,0).toString();
                      }
                      else if(correct===wrong){
                        return rgb(125,125,0).toString();
                      }
                      else if(correct>wrong){
                        return rgb(125*wrong/correct,125,0).toString();
                      }
                      else{
                        return rgb(125,125*correct/wrong,0).toString();
                      }
                    })
        
                    d3.select('svg').selectAll('text.eText').filter(function(a,i){
                      return a['id']===t;
                    })
                    .attr('visibility','visible')
                  }
                  else{
                    d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                      return a['id']===t;
                    })
                    .style('fill','grey')
                  }  
                }
        
                for(var i = 0; i<links.length; i++){
                    if(links[i].id.split(' ')[0].split('a')[1]!==undefined){
                      if(nodeIds.includes(parseInt(links[i].id.split(' ')[0].split('a')[1]))
                         && links[i].id.split(' ')[1].split('b')[1]!==undefined){
        
                        var id = parseInt(links[i].id.split(' ')[1].split('b')[1]);
        
                        for(var j = 0; j<links.length; j++){
                          if(links[j].id.split(' ')[0].split('b')[1]!==undefined){
                            if(parseInt(links[j].id.split(' ')[0].split('b')[1])===id){
                              if(links[j].id.split(' ')[1].split('a')[1]!==undefined){
                                if(nodeIds.includes(parseInt(links[j].id.split(' ')[1].split('a')[1]))){
        
                                  console.log(id);
                                  d3.select('svg').selectAll('ellipse.linkword').filter(function(a,i){
                                    return a['id']===id;
                                  }).attr('visibility','visible')
                                  d3.select('svg').selectAll('text.linkword').filter(function(a,i){
                                    return a['id']===id;
                                  }).attr('visibility','visible')
        
                                  d3.select('svg').selectAll('path.link').filter(function(a,t){
                                    return t===i;
                                  }).attr('visibility','visible')
                                  d3.select('svg').selectAll('path.link').filter(function(a,t){
                                    return t===j;
                                  }).attr('visibility','visible')
        
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                }
              }
             })

              d3.select('svg').selectAll('ellipse.node').on('mousedown', (d)=>{
              // d3.select('svg').selectAll('ellipse.node').on('click', (d)=>{
                var id = d['id'];
    
    
                if(d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                  return i===id}).attr('visibility')==='hidden'){
                    d3.select('svg').attr('clickOnNode', 'true');
                  }
                  else{
                    d3.select('svg').attr('clickOnNode', 'false');
                  }
    
    
    
                d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                  return i===id}).attr('visibility', 
                  d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                    return i===id}).attr('visibility')==='hidden'?'visible':'hidden'
                  );
                d3.select('svg').selectAll('text.gText').filter(function(a,i){
                    return i===id}).attr('visibility', 
                    d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                  );
                  d3.select('svg').selectAll('image.gImage').filter(function(a,i){
                    return i===id}).attr('visibility', 
                    d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                  );

                  d3.select('svg').selectAll('foreignObject.gButton').filter(function(a,i){
                    return i===id}).attr('visibility', 
                    d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                  );
    
                  d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                    return i!==id}).attr('visibility', 
                    'hidden'
                    );
                  d3.select('svg').selectAll('text.gText').filter(function(a,i){
                      return i!==id}).attr('visibility', 
                      'hidden'
                      );
                  d3.select('svg').selectAll('image.gImage').filter(function(a,i){
                        return i!==id}).attr('visibility', 
                        'hidden'
                        );
                  d3.select('svg').selectAll('foreignObject.gButton').filter(function(a,i){
                        return i!==id}).attr('visibility', 
                        'hidden'
                        );
    
            var k = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
              return i===id}).attr('visibility')==='hidden')?1:3;

              // console.log(k);
    
              var x = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                return i===id}).attr('visibility')==='hidden')?620:d['x'];
    
              var y = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                  return i===id}).attr('visibility')==='hidden')?240:d['y'];
    
                  d3.select('svg').transition()
                  .duration(750)
                  .attr('transform', 'translate(' + (1240 + 2*offset) * k / 2  + ',' + 480 * k / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
    
    
           })
    
    
              d3.select('svg').selectAll('ellipse.node').filter(function(d, i){
                return d['level']>2}).style('fill','grey').attr('locked','true');
              d3.select('svg').selectAll('ellipse.node').filter(function(d, i){
                return d['level']>2}).on('mousedown', (d)=> window.alert("Node locked"))
            }

            else {
    
    
              d3.select('svg').attr('clickOnNode', 'false');
    
              d3.select('svg').selectAll('rect.gRect').attr('visibility', 'hidden');
                d3.select('svg').selectAll('text.gText').attr('visibility', 'hidden');
                d3.select('svg').selectAll('image.gImage').attr('visibility', 'hidden');
                d3.select('svg').selectAll('foreignObject.gButton').attr('visibility', 'hidden');
              d3.select('svg').selectAll('ellipse.node').attr('locked', 'false')
              .on('mousedown', 
              (d)=> {           
                
                
                var id = d['id'];
    
                if(d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                  return i===id}).attr('visibility')==='hidden'){
                    d3.select('svg').attr('clickOnNode', 'true');
                  }
                  else{
                    d3.select('svg').attr('clickOnNode', 'false');
                  }
    
    
                  d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                    return i===id}).attr('visibility', 
                    d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return i===id}).attr('visibility')==='hidden'?'visible':'hidden'
                    );
                  d3.select('svg').selectAll('text.gText').filter(function(a,i){
                      return i===id}).attr('visibility', 
                      d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                        return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                    );
                  d3.select('svg').selectAll('image.gImage').filter(function(a,i){
                      return i===id}).attr('visibility', 
                      d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                        return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                    );

                  d3.select('svg').selectAll('foreignObject.gButton').filter(function(a,i){
                      return i===id}).attr('visibility', 
                      d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                        return i===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                    );

      
                    d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return i!==id}).attr('visibility', 
                      'hidden'
                      );
                    d3.select('svg').selectAll('text.gText').filter(function(a,i){
                        return i!==id}).attr('visibility', 
                        'hidden'
                        );
                    d3.select('svg').selectAll('image.gImage').filter(function(a,i){
                          return i!==id}).attr('visibility', 
                          'hidden'
                          );

                    d3.select('svg').selectAll('foreignObject.gButton').filter(function(a,i){
                          return i!==id}).attr('visibility', 
                          'hidden'
                          );
    
    
                    var k = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return i===id}).attr('visibility')==='hidden')?1:3;
            
                      var x = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                        return i===id}).attr('visibility')==='hidden')?620:d['x'];
            
                      var y = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                          return i===id}).attr('visibility')==='hidden')?240:d['y'];
            
                     d3.select('svg').transition()
                    .duration(750)
                    .attr('transform', 'translate(' + (1240 + 2*offset) * k / 2  + ',' + 480 * k / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
                
                });

                testMapService.callServerTest().subscribe(data=>{

                  d3.select('svg').selectAll('ellipse.node').attr('visibility','visible');
                  d3.select('svg').selectAll('text.eText').attr('visibility','visible');
                  d3.select('svg').selectAll('path.link').attr('visibility','visible');
                  d3.select('svg').selectAll('ellipse.linkword').attr('visibility','visible');
                  d3.select('svg').selectAll('text.linkword').attr('visibility','visible');

                  for(var t = 0; t<nodes.length; t++){
                
                
                    if (d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                      return a['id']===t;
                    }).attr('locked')==='false'){
                
                      d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                        return a['id']===t;
                      })
                      .style('fill',(d)=>{
                        var correct = parseInt(data[mapName]['blocktest']['node'+t]['true']);
                        var wrong = parseInt(data[mapName]['blocktest']['node'+t]['false']);
                
                        if(correct===0&&wrong===0){
                          return rgb(125,0,0).toString();
                        }
                        else if(correct===wrong){
                          return rgb(125,125,0).toString();
                        }
                        else if(correct>wrong){
                          return rgb(125*wrong/correct,125,0).toString();
                        }
                        else{
                          return rgb(125,125*correct/wrong,0).toString();
                        }
                      })
                    }
                  }
                })
            }
          
         })
         .on('end', function(d) {
             d3.select(this).classed("dragging", false);
         })    
    )
    ;
    
    for (let i = 0; i < glossaries.length; i++) {
      glossaries[i].hidden = true;
      gTexts[i].hidden = true;
    }

   

    var routerLink = svg.select('text.toNext').attr('routerLink');
    // console.log(routerLink);

    return [svg, circle, path, glossary, gText, gImage, linkword, circleNextMap, routerLink, gButton];
    
    
      }
  }




