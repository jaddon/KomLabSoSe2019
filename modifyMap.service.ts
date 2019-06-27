import * as d3 from 'd3';
import { RouterLink } from '@angular/router';


export class ModifyMapService{

// // store the numbers of ellipse, when create one new node then add one (ignore deleting)
//   ellipseNumber: any;

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


  removeNode(id: number, nodes: any, links: any, glossaries: any, gTexts: any){

    var ellipse = d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
      return parseInt(a['id'])===id;
    }).nodes()[0]

    var x = ellipse['cx']['baseVal']['value'];
    var y = ellipse['cy']['baseVal']['value'];

    var text;

    for(var i = 0;i<nodes.length;i++){
      if(parseInt(nodes[i]['id'])===id){
        text=nodes[i]['text'];
      }
    }
  
    // remove connected links
    for(var i = 0;i<links.length;i++){

      for(var t = 0;t<nodes.length;t++){

      var nodeId = nodes[t]['id'];

        for(var j =0;j<links.length;j++){
          if(links[j]['id'].split(' ')[0]===('a'+nodeId)){
            links[j]['source']=nodes[t];
          }
          else if(links[j]['id'].split(' ')[1]===('a'+nodeId)){
            links[j]['target']=nodes[t];
          }

          if((links[j]['id'].split(' ')[0].includes('a'))&&(links[j]['source']['id']===id)
            ||(links[j]['id'].split(' ')[1].includes('a'))&&(links[j]['target']['id']===id)
        ){   
            links.splice(j,1);
          }
        }
    }
  }


// remove node
    for(var i = 0;i<nodes.length;i++){
      if(parseInt(nodes[i]['id'])===id){
        nodes.splice(i,1);
      }
    }
// remove glossary and text conten in glossary
      for(var i = 0;i<glossaries.length;i++){
      if(parseInt(glossaries[i]['id'])===id){
        glossaries.splice(i,1);
      }
    }
    for(var i = 0;i<gTexts.length;i++){
      if(parseInt(gTexts[i]['id'])===id){
        gTexts.splice(i,1);
      }
    }

    console.log(gTexts)
    console.log(glossaries)
    console.log(nodes)


    d3.select('g.dropdown').attr('visibility', 'hidden');
  }


  modifyNode(id: number, nodes: any){

    console.log(id)

    // var ellipse = d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
    //   return parseInt(a['id'])===id;
    // }).nodes()[0]

    // var x = ellipse['cx']['baseVal']['value'];
    // var y = ellipse['cy']['baseVal']['value'];
    var x;
    var y;

    for(var i = 0;i<nodes.length;i++){
      if(nodes[i]['id']===id){
        x=parseInt(nodes[i]['x']);
        y=parseInt(nodes[i]['y']);
      }
    }

   
    var g = d3.select('svg').append('svg:g')
    .attr('class', 'modify')
    .attr('x',x)
    .attr('y',y)
    .attr('visibility', 'visible')

    var inputField = g.append("foreignObject")
    .attr('class','modify')
    .attr("width", 80)
    .attr("height", 50)
    .attr('x',x)
    .attr('y',y)


    inputField.append("xhtml:input")
    .attr('type', 'text')
    .style('height','20px')
    .style('font-size', '1px')
    .attr('id',100)
    ;

    var inputButton = g.append("foreignObject")
    .attr('class','modify')
    .attr("width", 60)
    .attr("height", 35)
    .attr('x',x+80)
    .attr('y',y-5)

    inputButton.append('xhtml:div')
    .attr('class','button')
    .html('<button type="button" class="btn btn-success btn-sm">Enter</button>')

    inputButton.on('mousedown',(d)=>{
      // get input value from input field, warning could be ignored
      var textNew = document.getElementById('100').value;

      document.querySelectorAll('[id^="eText'+id.toString()+'"]')[0].textContent=textNew;

      // document.getElementById(id.toString()).textContent=textNew;

      var index;

      for(var i=0;i<nodes.length;i++){
        if(nodes[i]['id']===id){
            index=i;
        }
      }

      nodes[index]['text'] = textNew;

     inputField.remove();
     inputButton.remove();
     d3.select('svg').select('g.modify').remove();

    })
   
    d3.select('g.dropdown').attr('visibility', 'hidden');

  }

  draggingNode(id: number, nodes: any){
    var ellipse = d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
      return parseInt(a['id'])===id;
    })

    var x = ellipse.attr('cx');
    var y = ellipse.attr('cy');

    var gRect = d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
      return parseInt(a['id'])===id;
    })

    var gText = d3.select('svg').selectAll('text.gText').filter(function(a,i){
      return parseInt(a['id'])===id;
    })

    var gImage = d3.select('svg').selectAll('image.gImage').filter(function(a,i){
      return parseInt(a['id'])===id;
    })


    var w = d3.select(window)
    .on("mousemove", (d)=>{


  // change d attribute of connected path to set them to point to new position of dragged node
    for(var i = 0; i<document.querySelectorAll('[id^="a'+id.toString()).length; i++){

      var dOld = document.querySelectorAll('[id^="a'+id.toString())[i].getAttribute('d');
      var dNew = 'M'+d3.event.x+','+(d3.event.y-110)+'L'+dOld.split('L')[1];
      document.querySelectorAll('[id^="a'+id.toString())[i].setAttribute('d',dNew)

      // console.log(dNew);
    }

    for(var i = 0; i<document.querySelectorAll('[id$="a'+id.toString()).length; i++){

      var dOld = document.querySelectorAll('[id$="a'+id.toString())[i].getAttribute('d');
      var dNew = dOld.split('L')[0]+'L'+d3.event.x+','+(d3.event.y-110);
      document.querySelectorAll('[id$="a'+id.toString())[i].setAttribute('d',dNew)
    }  




    for(var i = 0;i<nodes.length;i++){
      if(parseInt(nodes[i]['id'])===id){
        nodes[i]['x']=d3.event.x;
        nodes[i]['y']=(d3.event.y-110);
      }
    }

      ellipse
      .attr('cx',d3.event.x)
      .attr('cy',d3.event.y-110)
      .attr('opacity','0.6');

      gRect
      .attr('x',d3.event.x)
      .attr('y',d3.event.y-110);

      gText
      .attr('x',d3.event.x+10)
      .attr('y',d3.event.y-100)
      .call(this.wrap,40)
      ;

      gImage
      .attr('x',d3.event.x+10)
      .attr('y',d3.event.y-50);

      d3.select('svg').selectAll('text.eText').filter(function(a,i){
        return parseInt(a['id'])===id;})
        .attr('x',d3.event.x)
        .attr('y',d3.event.y-110)

        d3.select('g.dropdown').attr('visibility', 'hidden');


    })
    .on('mouseup',(d)=>{
      // d3.select('svg').classed('active',false);
      var ellipse = d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
        return parseInt(a['id'])===id;
      })
      .attr('opacity','1');
      w.on("mousemove", null).on("mouseup", null);
      
    })
  }

  initSvg(svg, width, height, path, circle, linkword, glossary, gText, gImage, sliderCircle, circleNextMap, toNextMapRect, linkwords, toNextMapButton) : any[]{
    svg = d3.select('svg')
    .attr('oncontextmenu', 'return false;')
    .attr('width', width)
    .attr('height', height)
    .attr('ready', false)
    // store the total number of ellipse to give id for new created ellipse (ignore delete action)
    .attr('nodeTotalNumber', 0);

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
    ;






// // link word should only be created once, therefore moved into ngAfterInit 
//        // create link words
//        linkword = linkword.data(linkwords, (d) => d.id);
//       //  linkword.exit().remove();
//        // const g1 = linkword.enter().append('svg:g');


//        const gLinkWord = linkword.enter()
//        .append('svg:g')
//        .attr('class', 'linkword')
//        .attr('x', (d) => d.x)
//        .attr('y', (d) => d.y)
//        .attr('length', (d) => d.text.length)

//        linkword = gLinkWord.merge(linkword);
      
//       //  linkword = linkword.enter()
//       //  .append('svg:g')
//       //  .attr('class', 'linkword')
//       //  .attr('x', (d) => d.x)
//       //  .attr('y', (d) => d.y)
//       //  .attr('length', (d) => d.text.length)
//       //  .merge(linkword)
//       //  ;
   
//        svg.selectAll('g.linkword')
//        .append('svg:ellipse')
//        .attr('class', 'linkword')
//        .attr('cx', (d) => d.x )
//        .attr('cy', (d) => d.y-1 )
//        .attr('rx', '10')
//        .attr('ry', '7')
//        .attr('fill', 'lightgrey')
//        ;
      
//        svg.selectAll('g.linkword')
//        .append('svg:text')
//        .attr('class', 'linkword')
//        .attr('x', (d) => d.x)
//        .attr('y', (d) => d.y)
//        .attr('fill', 'red')
//        .attr('font-size', '5')
//        .attr('text-anchor', 'middle')
//        .text((d) => d.text)
//        ;


//     //  console.log(linkwords.length);
//     for(var id = 0;id<parseInt(linkwords.length);id++){
//       var textLength = svg.selectAll('g.linkword').filter(function(a,i){
//        return i===id}).attr('length');
//       //  console.log(parseInt(textLength)+1);
//        svg.selectAll('ellipse.linkword').filter(function(a,i){
//         return i===id;}).attr('rx', parseInt(textLength)*2+3)
//     }




// create slider bar
    var data = [1,2,3];
    var scale = d3.scaleLinear()
                  .domain([1, d3.max(data)])
                  .range([0, 200]);
    var x_axis = d3.axisBottom(scale)
    .ticks(2, "f");

    svg.append("g")
       .attr("transform", "translate(900, 10)")
       .call(x_axis);

// create ball on the slider bar
    sliderCircle = svg.append("circle")
    .attr('class', 'ball')
    .attr("cx", 1100)
    .attr("cy", 10)
    .attr("r", 7)
    .style("fill", "purple");




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

    // dropdown menu
    var dropdown = svg.append('svg:g')
    .attr('class','dropdown')
    .attr('x', '0')
    .attr('y', '0')
    .style('cursor', 'pointer')
    .attr('visibility', 'hidden')
    ;

    var button1 = dropdown.append("foreignObject")
    .attr('class','dropdown1')
   .attr("width", 70)
   .attr("height", 35)
   .attr('x', '0')
   .attr('y', '0')
   .append('xhtml:div')
   .attr('class','button')
   .html('<button type="button" class="btn btn-primary btn-sm">drag</button>')

   var button2 = dropdown.append("foreignObject")
   .attr('class','dropdown2')
   .attr("width", 70)
   .attr("height", 35)
   .attr('x', '0')
   .attr('y', '35')
   .append('xhtml:div')
   .attr('class','button')
   .html('<button type="button" class="btn btn-primary btn-sm">modify</button>')

   var button3 = dropdown.append("foreignObject")
   .attr('class','dropdown3')
   .attr("width", 70)
   .attr("height", 35)
   .attr('x', '0')
   .attr('y', '70')
   .append('xhtml:div')
   .attr('class','button')
   .html('<button type="button" class="btn btn-primary btn-sm">delete</button>')

   // create menu
   var create = svg.append('svg:g')
   .attr('class','create')
   .attr('x', '0')
   .attr('y', '0')
   .style('cursor', 'pointer')
   .attr('visibility', 'hidden')
   ;

  var button4 = create.append("foreignObject")
  .attr('class','create1')
  .attr("width", 80)
  .attr("height", 35)
  .attr('x', '0')
  .attr('y', '0')
  

  button4.append('xhtml:div')
  .attr('class','button')
  .html('<button type="button" class="btn btn-primary btn-sm">concept</button>')

  var button5 = create.append("foreignObject")
  .attr('class','create2')
  .attr("width", 80)
  .attr("height", 35)
  .attr('x', '0')
  .attr('y', '35')
  .append('xhtml:div')
  .attr('class','button')
  .html('<button type="button" class="btn btn-primary btn-sm">linkword</button>')

   // input for enter the text in ellipse
   var eInput = svg.append('svg:g')
   .attr('class','create')
   .attr('x', '0')
   .attr('y', '0')
   .style('cursor', 'pointer')
   .attr('visibility', 'hidden')
   ;



    return [svg, path, circle, linkword, glossary, gText, gImage, sliderCircle, circleNextMap, toNextMapRect];
    
  }


  buildMicroMap(svg, path, links, glossary, glossaries, gText, gTexts, gImage, circle, nodes, linkword, linkwords, sliderCircle, nodesNextMap, circleNextMap, offset) : any[]{

    d3.select('svg').attr('nodeTotalNumber',(d)=>{
      return nodes.length;
    })
    
    // svg.select('text.toNext').attr('font-size', '30px')
    // .attr('visibility', (d)=>{
    //   return svg.select('rect.toNext').attr('visibility');
    // });
    
    
    // bind the paths with data
     path = path.data(links,(d)=>d.id);
    // bind the white rectangulars with data
        glossary = glossary.data(glossaries,(d)=>d.id);
    
        gText = gText.data(gTexts,(d)=>d.id);
    
        gImage = gImage.data(gTexts,(d)=>d.id);
    
        linkword = linkword.data(linkwords,(d)=>d.id);
    
        path.exit().remove();


        const gPath = path.enter().append('svg:g');
    
      // create paths
      gPath
      .append('svg:path')
      .attr('class', 'link')
      .attr('id',(d)=>d.id)
      // .attr('id', (d)=>d.source.x.toString()+','+d.source.y.toString()+' '+d.target.x.toString()+','+d.target.y.toString())
      .attr('source', (d)=>d.source)
      .attr('target', (d)=>d.target)
      .attr('sourceX',(d)=>d.source.x)
      .attr('sourceY',(d)=>d.source.y)
      .attr('targetX',(d)=>d.target.x)
      .attr('targetY',(d)=>d.target.y)
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
        const sourceX = d.source.x ;
        const sourceY = d.source.y ;
        const targetX = d.target.x ;
        const targetY = d.target.y ;
    // calculate the d attribute for path
        return `M${sourceX},${sourceY}L${targetX},${targetY}`;
      })
      // set arrow style
      .style('marker-start', (d) => d.left ? 'url(#start-arrow)' : '')
      .style('marker-end', (d) => d.right ? 'url(#end-arrow)' : '')
      // .merge(path);
    
      path = gPath.merge(path);
      path.exit().remove();


   
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
    .attr('rx', 34)
    .attr('ry', 16)
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
    .attr('rx', 34)
    .attr('ry', 16)
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('id', (d)=> d.id)
    // .attr('fill',(d) => d.id===0? 'red': 'black')
    .style('fill', (d) => 
    {
      return 'green';
    }
    )
    .style('stroke', (d) => (!d.reflexive) ? 'black' : 'white')
    .on('mousedown', (d) => {

    if(d3.event.button===0){
      // this code is needed for initialize the mousedown function before dragging the slider bar
      if(
          parseInt(svg.select('circle.ball').attr('cx'))===900
        ){
        window.alert("Node locked");

        // console.log("clicked lock")
      }
      else{    
      }
        }

    
     
  });
    
 
    // create texts
    g.append('svg:text')
    .attr('class', 'eText')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('id',(d) => 'eText'+d.id.toString())
    .attr('fill', 'white')
    .attr('font-size', '5')
    .attr('text-anchor', 'middle')
    .attr('text',(d)=>d.text)
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

    const gGlossary = glossary.enter().append('svg:g');
    
    
        gGlossary
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
          .attr('id',(d)=>d.id)
          .attr('stroke', 'black')
          .on('mousedown', (d)=>{
   
            if(d3.event.button === 0){

                d3.select('svg').attr('clickOnNode', 'true');


                svg.select('foreignObject.pdf')
                .attr('visibility','visible')
                .transition()
                .duration(0)
                .attr('transform', 'translate('+ (d.target.x-180) + ", 0)");
    
                // make sure that the pdf view will be fixed on the top of page
                //   svg.transition().duration(0).attr('transform','translate(' + (1240 + 2*offset) * 3 / 2  + ',' + (310+d.target.y*2) * 3 / 2 + ')scale(' + 3 + ')translate(' + -d.target.x + ',' + -d.target.y + ')');
                
                // make sure the pdf could be fully shown even if click on node on the left border
                if(d.target.x<150){
                  svg.select('foreignObject.pdf')
                  .attr('visibility','visible')
                  .transition()
                  .duration(0)
                  .attr('transform', 'translate('+ (d.target.x-65) + ", 0)");
                }
    
                svg.attr('page', parseInt(d.page)+18);
                // console.log("current page: " + d.page);

            }
            

            
          })
          // .merge(glossary)
          ;

          glossary = gGlossary.merge(glossary)
          
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
    .attr('id',(d)=>d.id)
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


    //todo

// link word should only be created once, therefore moved into ngAfterInit 
       // create link words
      //  linkword.exit().remove();
       // const g1 = linkword.enter().append('svg:g');


       const gLinkWord = linkword.enter()
       .append('svg:g')
       .attr('class', 'linkword')
       .attr('x', (d) => d.x)
       .attr('y', (d) => d.y)
       .attr('length', (d) => d.text.length)

       linkword = gLinkWord.merge(linkword);
      
      //  linkword = linkword.enter()
      //  .append('svg:g')
      //  .attr('class', 'linkword')
      //  .attr('x', (d) => d.x)
      //  .attr('y', (d) => d.y)
      //  .attr('length', (d) => d.text.length)
      //  .merge(linkword)
      //  ;
   
       gLinkWord
       .append('svg:ellipse')
       .attr('class', 'linkword')
       .attr('cx', (d) => d.x )
       .attr('cy', (d) => d.y-1 )
       .attr('rx', '10')
       .attr('ry', '7')
       .attr('fill', 'lightgrey')
       ;
      
       gLinkWord
       .append('svg:text')
       .attr('class', 'linkword')
       .attr('x', (d) => d.x)
       .attr('y', (d) => d.y)
       .attr('fill', 'red')
       .attr('font-size', '5')
       .attr('text-anchor', 'middle')
       .text((d) => d.text)
       ;


    //  console.log(linkwords.length);
    for(var id = 0;id<parseInt(linkwords.length);id++){
      var textLength = svg.selectAll('g.linkword').filter(function(a,i){
       return i===id}).attr('length');
      //  console.log(parseInt(textLength)+1);
       svg.selectAll('ellipse.linkword').filter(function(a,i){
        return i===id;}).attr('rx', parseInt(textLength)*2+3)
    }

    
    
// start state
// d3.select('svg').attr('clickOnNode', 'false');
    
            //   d3.select('svg').selectAll('rect.gRect').attr('visibility', 'hidden');
            //     d3.select('svg').selectAll('text.gText').attr('visibility', 'hidden');
            //     d3.select('svg').selectAll('image.gImage').attr('visibility', 'hidden');
              d3.select('svg').selectAll('ellipse.node').on('mousedown', 
              (d)=> {      
                  
                
                // console.log(d3.event.button);

                //  // right click
                //  if(d3.event.button===2){
                //     svg.select('svg:g.dropdown').attr('visibility','visible');
                //     console.log('right')
                // }


                // console.log('start state');

                var id = d['id'];

                //  important: in modification mode svg will return to start state after dragging slider

                if(d3.event.button === 0 && d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                    return i===id}).style('fill')==='grey'){
                        window.alert("Node locked");
                    }
                

                if(d3.event.button === 0 && d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                    return i===id}).style('fill')==='green'){
                                    
 

    
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
                }

          
        })
        .on('contextmenu', (d)=>{
            
                 // right click
                 if(d3.event.button===2){
                    svg.select('g.dropdown').attr('visibility','visible')
                    svg.selectAll('g.modify').attr('visibility','hidden')
                    .attr('x', d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                      // console.log(d);
                      // console.log(a);
                        return a['id']===d['id']}).attr('cx'))
                    ;

                    for(var i = 1; i<4; i++){
                    svg.selectAll('foreignObject.dropdown'+i).attr('x', d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                        return a['id']===d['id']}).attr('cx'))
                    ;

                    svg.selectAll('foreignObject.dropdown'+i).attr('y', parseInt(d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                      return a['id']===d['id']}).attr('cy'))+(i-1)*35)
                      .attr('nodeId',d['id'])
                      .on('mousedown', (d)=>{

                        d3.select('svg').select('g.create').attr('visibility','hidden');

                        // // get cy of the clicked ellipse
                        // var y = d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                        //   var id = parseInt(d3.select('foreignObject.dropdown3').attr('nodeId'));
                        //   return a['id']===id;
                        // }).nodes()[0]['cy']['baseVal']['value']


                        // console.log(d3.event['path'][2]['y']['baseVal']['value'])

                        // console.log(d3.select('foreignObject.dropdown3').attr('y'))



                        // if click on delete button
                        if(parseInt(d3.event['path'][2]['y']['baseVal']['value'])===parseInt(d3.select('foreignObject.dropdown3').attr('y'))){
                          var id = parseInt(d3.select('foreignObject.dropdown3').attr('nodeId'));

                          this.removeNode(id, nodes, links, glossaries, gTexts);
                        }
                        
                        // if click on modify
                        else if(parseInt(d3.event['path'][2]['y']['baseVal']['value'])===parseInt(d3.select('foreignObject.dropdown2').attr('y'))){
                          // console.log('modify')
                          var id = parseInt(d3.select('foreignObject.dropdown3').attr('nodeId'));
                          this.modifyNode(id, nodes);

                        }

                        // if click on dragging button
                        else if(parseInt(d3.event['path'][2]['y']['baseVal']['value'])===parseInt(d3.select('foreignObject.dropdown1').attr('y'))) {
                          var id = parseInt(d3.select('foreignObject.dropdown3').attr('nodeId'));
                          this.draggingNode(id, nodes);

                        }

                      })
                  ;
                    }
                }
        })

  
    
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
            if(d3.event.x<950){
              return 900;
            }
            else if(d3.event.x<=1050){
              return 1000;
            }
            else{
              return 1100;
            }
          })
          d3.select(this).attr("cy", 10);
    
          var cx = parseInt(d3.select(this).attr('cx'));
            if(cx===900){
              d3.select('svg').selectAll('rect.gRect').attr('visibility', 'hidden');
                d3.select('svg').selectAll('text.gText').attr('visibility', 'hidden');
              d3.select('svg').selectAll('ellipse.node').style('fill','grey')
              .on('mousedown', (d)=> {

                if(d3.event.button===0){
                    window.alert("Node locked");
                  }

              })
            }
            
            else if(cx===1000){
    
              d3.select('svg').attr('clickOnNode', 'false');
    
              d3.select('svg').selectAll('ellipse.node').style('fill','green');
              d3.select('svg').selectAll('ellipse.node').on('mousedown', (d)=>{


                if(d3.event.button===0){

                    
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
    
            var k = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
              return i===id}).attr('visibility')==='hidden')?1:3;

              // console.log(k);
    
              var x = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                return i===id}).attr('visibility')==='hidden')?620:d['x'];
    
              var y = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                  return i===id}).attr('visibility')==='hidden')?240:d['y'];
    
                //   d3.select('svg').transition()
                //   .duration(750)
                //   .attr('transform', 'translate(' + (1240 + 2*offset) * k / 2  + ',' + 480 * k / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');                
                }

           })
    
    
              d3.select('svg').selectAll('ellipse.node').filter(function(d, i){
                return i>=7}).style('fill','grey');
              d3.select('svg').selectAll('ellipse.node').filter(function(d, i){
                  return i>=7}).on('mousedown', (d)=> {

                    if(d3.event.button===0){
                        window.alert("Node locked");
                    }
                  })
            }
            else {
    
    
              d3.select('svg').attr('clickOnNode', 'false');
    
              d3.select('svg').selectAll('rect.gRect').attr('visibility', 'hidden');
                d3.select('svg').selectAll('text.gText').attr('visibility', 'hidden');
                d3.select('svg').selectAll('image.gImage').attr('visibility', 'hidden');
              d3.select('svg').selectAll('ellipse.node').style('fill','green').on('mousedown', 
              (d)=> {      
                
                
                if(d3.event.button===0){
                
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
        
        
                        var k = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                          return i===id}).attr('visibility')==='hidden')?1:3;
                
                          var x = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                            return i===id}).attr('visibility')==='hidden')?620:d['x'];
                
                          var y = (d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                              return i===id}).attr('visibility')==='hidden')?240:d['y'];
                
                        //  d3.select('svg').transition()
                        // .duration(750)
                        // .attr('transform', 'translate(' + (1240 + 2*offset) * k / 2  + ',' + 480 * k / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');  

                }

     
                });
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


    var w = d3.select(window);

    w.on('mousedown',(d)=>{
      // if click on the background
      if(d3.event.button===0){
        if(d3.event.path.length===8){
          d3.select('g.dropdown').attr('visibility','hidden');
          d3.select('g.create').attr('visibility','hidden');
          d3.selectAll('g.modify').remove();
        }
      }

    })
    .on('contextmenu',(d)=>{


      console.log(gTexts)

      // console.log(d3.event.path.length)
      d3.select('svg').select('g.create').attr('visibility','hidden')


      if(d3.event.path.length<=8){
        d3.select('svg').select('g.dropdown').attr('visibility','hidden')
        d3.selectAll('g.modify').remove()
          d3.select('g.create').attr('visibility','visible')
          d3.select('foreignObject.create1').attr('x',d3.event.x-14)
          .attr('y',d3.event.y-120);
          d3.select('foreignObject.create2').attr('x',d3.event.x-14)
          .attr('y',d3.event.y-85);

          d3.select('svg').select('foreignObject.create1')
          .on('mousedown',(d)=>{

            d3.select('svg').attr('nodeTotalNumber', (d)=>{
              return parseInt(d3.select('svg').attr('nodeTotalNumber'))+1;
            })

            var id = parseInt(nodes.length);

            nodes.push({id: parseInt(nodes.length), text: "", x: d3.select('foreignObject.create1')
            .attr('x'), y: d3.select('foreignObject.create1')
            .attr('y'), reflexive: true});

            glossaries.push({id: id,
              target: nodes[id],
              hidden: true,
              width: 60,
              height: 80,
              page: '1'
            })

            gTexts.push({id: id,
              target: nodes[id],
              hidden: true,
              page: '1'
            })

            d3.select('svg').select('g.create').attr('visibility','hidden')

            // input the text in created ellipse
            this.modifyNode(id, nodes);
          })


          d3.select('svg').select('foreignObject.create2')
          .on('mousedown',(d)=>{

            var idLinkWord = parseInt(linkwords.length);

            linkwords.push({id: parseInt(linkwords.length), text: "default", x: parseInt(d3.select('foreignObject.create1')
            .attr('x')), 
            y: parseInt(d3.select('foreignObject.create1')
            .attr('y'))});

            d3.select('svg').select('g.create').attr('visibility','hidden')

            console.log(linkwords)


          }
        )
          
      }
      
    })

    return [svg, circle, path, glossary, gText, gImage, linkword, circleNextMap, routerLink];
    
    
      }
  }




