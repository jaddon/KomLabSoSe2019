import * as d3 from 'd3';
import { RouterLink } from '@angular/router';
import { saveAs } from 'file-saver';


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


  modifyNode(id: number, nodes: any, gTexts: any, glossaries: any){

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
    .attr('placeholder', 'enter name')
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

     this.modifyGlossary(id, nodes, gTexts, glossaries);


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

      console.log('x'+d3.event.x+' '+'y'+(d3.event.y-110));
      
    })
  }


  modifyGlossary(id: number, nodes: any, gTexts: any, glossaries: any){

    var x;
    var y;

    for(var i = 0;i<nodes.length;i++){
      if(parseInt(nodes[i]['id'])===id){
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
    .attr("width", 120)
    .attr("height", 50)
    .attr('x',x)
    .attr('y',y)


    inputField.append("xhtml:input")
    .attr('type', 'text')
    .style('height','20px')
    .style('font-size', '1px')
    .attr('id',300)
    .attr('placeholder', 'enter glossary text')
    ;

    var inputFieldPage = g.append("foreignObject")
    .attr('class','modify')
    .attr("width", 30)
    .attr("height", 50)
    .attr('x',x)
    .attr('y',y+22)


    inputFieldPage.append("xhtml:input")
    .attr('type', 'text')
    .style('height','20px')
    .style('font-size', '1px')
    .attr('id',400)
    .attr('placeholder', 'page')
    ;

    var inputButton = g.append("foreignObject")
    .attr('class','modify')
    .attr("width", 60)
    .attr("height", 70)
    .attr('x',x+120)
    .attr('y',y-5)

    inputButton.append('xhtml:div')
    .attr('class','button')
    .html('<button type="button" class="btn btn-success btn-sm">Enter</button>')

    inputButton.on('mousedown',(d)=>{
      // get input value from input field, warning could be ignored
      var textNew = document.getElementById('300').value;
      var pageNew = document.getElementById('400').value;

      for(var i = 0;i<gTexts.length;i++){
        if(parseInt(gTexts[i]['id'])===id){
          gTexts[i]['text']=textNew;
          gTexts[i]['page']=pageNew;
        }
      }

      var gText = d3.select('svg').selectAll('text.gText').filter(function(a,i){
        return parseInt(a['id'])===id;
      })

      console.log(id)
      console.log(gText)

      gText
      .text(textNew)
      .call(this.wrap,40)
      ;

      console.log(gText)

      for(var i = 0;i<glossaries.length;i++){
        if(parseInt(glossaries[i]['id'])===id){
          glossaries[i]['page']=pageNew;
        }
      }

      console.log(gTexts);
      // document.querySelectorAll('[id^="eText'+id.toString()+'"]')[0].textContent=textNew;

     inputField.remove();
     inputButton.remove();
     d3.select('svg').select('g.modify').remove();


    })
   
    d3.select('g.dropdown').attr('visibility', 'hidden');

  }


  modifyLinkword(id: number, linkwords: any){

    var x;
    var y;

    for(var i = 0;i<linkwords.length;i++){
      if(linkwords[i]['id']===id){
        x=parseInt(linkwords[i]['x']);
        y=parseInt(linkwords[i]['y']);
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
    .attr('id',200)
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
      var textNew = document.getElementById('200').value;

      document.querySelectorAll('[id^="lText'+id.toString()+'"]')[0].textContent=textNew;


      var index;

      for(var i=0;i<linkwords.length;i++){
        if(linkwords[i]['id']===id){
            index=i;
        }
      }

      linkwords[index]['text'] = textNew;

     inputField.remove();
     inputButton.remove();
     d3.select('svg').select('g.modify').remove();

    })
   
    d3.select('g.dropdown').attr('visibility', 'hidden');

  }




  initSvg(svg, width, height, path, circle, linkword, glossary, gText, gImage, circleNextMap, toNextMapRect, linkwords, toNextMapButton) : any[]{
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

   // save the data into json file
    var saveButton = svg.append("foreignObject")
    .attr('class','save')
    .attr("width", 120)
    .attr("height", 60)
    .attr('x', '550')
    .attr('y', '10')
    .append('xhtml:div')
    .attr('class','button')
    .html('<button type="button" class="btn btn-primary btn-sm active">Save</button>');

    return [svg, path, circle, linkword, glossary, gText, gImage, circleNextMap, toNextMapRect];
    
  }


  buildMicroMap(svg, path, links, glossary, glossaries, gText, gTexts, gImage, circle, nodes, linkword, linkwords, nodesNextMap, circleNextMap, offset) : any[]{


  // transform the data into a consistent form with the original json data
  var nodesJSON = nodes;
  var linkwordsJSON = linkwords;
  var nodesNextMapJSON = nodesNextMap;

  var linksJSON = [];
  for(var i = 0;i<links.length;i++){
    var linkJSON = {id:null, source:null, target:null}
    linkJSON['id']=links[i]['id']
    var sourceId=links[i]['id'].split(' ')[0];
    var targetId=links[i]['id'].split(' ')[1];

    if(sourceId.includes('a')){
      linkJSON['source']='nodes['+sourceId.split('a')[1]+']';
    }
    else if(sourceId.includes('b')){
      linkJSON['source']='linkwords['+sourceId.split('b')[1]+']';
    }
    if(targetId.includes('a')){
      linkJSON['target']='nodes['+targetId.split('a')[1]+']';
    }
    else if(targetId.includes('b')){
      linkJSON['target']='linkwords['+targetId.split('b')[1]+']';
    }
    linksJSON.push(linkJSON);
  }

  var gTextsJSON = [];
  for(var i=0;i<gTexts.length;i++){
    var gTextJSON = {id:null, text:null, target:null, hidden:true, page:null}
    gTextJSON['id']=gTexts[i]['id'];
    gTextJSON['text']=gTexts[i]['text'];
    gTextJSON['page']=gTexts[i]['page'];
    gTextJSON['target'] = 'nodes['+gTexts[i]['target']['id']+']';
    gTextsJSON.push(gTextJSON);
  }

  var glossariesJSON = [];
  for(var i=0;i<glossaries.length;i++){
    var glossaryJSON = {id:null, target:null, hidden:true, width: 60, height: 80, page:null}
    glossaryJSON['id']=glossaries[i]['id'];
    glossaryJSON['page']=glossaries[i]['page'];
    glossaryJSON['target'] = 'nodes['+glossaries[i]['target']['id']+']';
    glossariesJSON.push(glossaryJSON);
  }

   d3.select('foreignObject.save')
   .on('click',(d)=>{
    var blob = new Blob(["\"nodes\":"+JSON.stringify(nodesJSON)+",\n\n\n"+"\"linkwords\":"+JSON.stringify(linkwordsJSON)+",\n\n\n"+"\"lins\":"+JSON.stringify(linksJSON)+",\n\n\n"+"\"nodesNextMap\":"+JSON.stringify(nodesNextMapJSON)+",\n\n\n"+"\"glossaries\":"+JSON.stringify(glossariesJSON)+",\n\n\n"+"\"gTexts\":"+JSON.stringify(gTextsJSON)], { type: "" });
    saveAs(blob, "modifiedMap.json");
  })

    d3.selectAll('path.temp').remove();


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
    // calculate the d attribute for path
        return `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`;
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
    .attr('id', (d)=> d.id)
    // .attr('fill',(d) => d.id===0? 'red': 'black')
    .style('fill', (d) => 
    {
      return 'green';
    }
    )
    .style('stroke', (d) => (!d.reflexive) ? 'black' : 'white')
    .on('mouseover', (d)=>{
      d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
        return a['id']===d.id;
      })
      .style('fill','lightgreen')

    // store the destination for new generated path
      d3.select('svg').attr('endNodeId',d.id)
    })
    .on('mouseout', (d)=>{
      d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
        return a['id']===d.id;
      })
      .style('fill','green');

      d3.select('svg').attr('endNodeId',null)
    })

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
  })
  .call(d3.drag()
  .on('start',function(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this)
    .classed("dragging", true);

    d3.select('svg')
    .append('svg:path')
    .attr('class', 'dragLine')
    .attr('sourceX',(d)=>d3.event.x)
    .attr('sourceY',(d)=>d3.event.y)
    .attr('targetX',(d)=>d3.event.x)
    .attr('targetY',(d)=>d3.event.y)
    .attr('d', (d) => {     
  // calculate the d attribute for path
      return `M${d3.event.x},${(d3.event.y)}L${d3.event.x},${d3.event.y}`;
    })
    
    // d3.select('svg').attr('drag',true);

    d3.select('svg').attr('startNodeId',this.id);

  })
  .on('drag',function(d) {
    d3.select('path.dragLine')
    .attr('sourceX',(d)=>d3.select(this).attr('cx'))
    .attr('sourceY',(d)=>d3.select(this).attr('cy'))
    .attr('targetX',(d)=>d3.event.x)
    .attr('targetY',(d)=>d3.event.y)
    .attr('d', (d) => {     
      // calculate the d attribute for path
          return `M${d3.select(this).attr('cx')},${d3.select(this).attr('cy')}L${d3.event.x},${d3.event.y}`;
        })
      // set arrow style
      .style('marker-end', 'url(#end-arrow)');


  })
  .on('end', function(d) {
    d3.select(this).classed("dragging", false);

    var targetNodeId;
    var targetLinkwordId;
    if(d3.select('svg').attr('endNodeId')!==null){
      targetNodeId = parseInt(d3.select('svg').attr('endNodeId'));
    }
    if(d3.select('svg').attr('endLinkwordId')!==null){
      targetLinkwordId = parseInt(d3.select('svg').attr('endLinkwordId'));
    }

    // avoid create path to itself
    if(parseInt(d3.select('svg').attr('startNodeId'))===targetNodeId) {
      d3.selectAll('path.dragLine').remove();
      return;
    } 

    if(targetLinkwordId===undefined&&targetNodeId===undefined){
      d3.selectAll('path.dragLine').remove();
      return;
    } 

    var sourceNode;
    for(var i = 0;i<nodes.length;i++){
      if(nodes[i]['id']===parseInt(this.id)){
        sourceNode = nodes[i];
      }
    }
   if(targetNodeId===undefined){
    var endLinkword;
    for(var i = 0;i<linkwords.length;i++){
      if(linkwords[i]['id']===parseInt(targetLinkwordId)){
        endLinkword = linkwords[i];
      }
    }

    //don't create duplicated link
    var duplicated=false;
    for(var i=0;i<links.length;i++){
      if(links[i]['id']==='a'+this.id+' b'+targetLinkwordId){
        duplicated=true;
        d3.selectAll('path.dragLine').remove();
        return;
      }
    }
      links.push({
      source: sourceNode,
      target: endLinkword,
      left: false,
      right: true,
      id: 'a'+this.id+' b'+targetLinkwordId

    })

    // append a temporaty path because the path generated from data will be shown by next click
    d3.select('svg')
    .append('svg:path')
    .attr('class','temp')
    .attr('sourceX',(d)=>d3.select(this).attr('cx'))
    .attr('sourceY',(d)=>d3.select(this).attr('cy'))
    .attr('targetX',(d)=>endLinkword['x'])
    .attr('targetY',(d)=>endLinkword['y'])
    .attr('d', (d) => {     
      // calculate the d attribute for path
          return `M${d3.select(this).attr('cx')},${d3.select(this).attr('cy')}L${endLinkword['x']},${endLinkword['y']}`;
        })
      // set arrow style
      .style('marker-end', 'url(#end-arrow)');
 
    }
    else{
      var endNode;
      for(var i = 0;i<nodes.length;i++){
        if(nodes[i]['id']===parseInt(targetNodeId)){
          endNode = nodes[i];
        }
      }
      //don't create duplicated link
      var duplicated=false;
      for(var i=0;i<links.length;i++){
       if(links[i]['id']==='a'+this.id+' a'+targetNodeId){
        duplicated=true;
        d3.selectAll('path.dragLine').remove();
        return;
       }
     }
        links.push({
        source: sourceNode,
        target: endNode,
          left: false,
          right: true,
          id: 'a'+this.id+' a'+targetNodeId
        })
         // append a temporaty path because the path generated from data will be shown by next click
    d3.select('svg')
    .append('svg:path')
    .attr('class','temp')
    .attr('sourceX',(d)=>d3.select(this).attr('cx'))
    .attr('sourceY',(d)=>d3.select(this).attr('cy'))
    .attr('targetX',(d)=>endNode['x'])
    .attr('targetY',(d)=>endNode['y'])
    .attr('d', (d) => {     
      // calculate the d attribute for path
          return `M${d3.select(this).attr('cx')},${d3.select(this).attr('cy')}L${endNode['x']},${endNode['y']}`;
        })
      // set arrow style
      .style('marker-end', 'url(#end-arrow)');
    }
    


    d3.selectAll('path.dragLine').remove();
    
 })
 )
 ;
    
 
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
                console.log(d.page)
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
       .attr('id',(d)=>d.id)
       .attr('length', (d) => d.text.length)

       linkword = gLinkWord.merge(linkword);
   
       gLinkWord
       .append('svg:ellipse')
       .attr('class', 'linkword')
       .attr('cx', (d) => d.x )
       .attr('cy', (d) => d.y-1 )
       .attr('id',(d)=>d.id)
       .attr('rx', '10')
       .attr('ry', '10')
       .attr('fill', 'lightgrey')
       .on('mouseover', (d)=>{ 
           d3.selectAll('ellipse.linkword')
           .filter(function(a,i){
             return a['id']===d.id;
           })
           .attr('fill','grey');
           d3.select('svg').attr('endLinkwordId',d.id)
       })
       .on('mouseout',function(d){
          d3.select(this).attr('fill','lightgrey');
          d3.select('svg').attr('endLinkwordId',null)
      })
      .call(d3.drag()
      .on('start',function(d) {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this)
        .classed("dragging", true);
    
        d3.select('svg')
        .append('svg:path')
        .attr('class', 'dragLine')
        .attr('sourceX',(d)=>d3.event.x)
        .attr('sourceY',(d)=>d3.event.y)
        .attr('targetX',(d)=>d3.event.x)
        .attr('targetY',(d)=>d3.event.y)
        .attr('d', (d) => {     
      // calculate the d attribute for path
          return `M${d3.event.x},${(d3.event.y)}L${d3.event.x},${d3.event.y}`;
        })
        
        // d3.select('svg').attr('drag',true);
    
        d3.select('svg').attr('startLinkwordId',this.id);
    
      })
      .on('drag',function(d) {
        d3.select('path.dragLine')
        .attr('sourceX',(d)=>d3.select(this).attr('cx'))
        .attr('sourceY',(d)=>d3.select(this).attr('cy'))
        .attr('targetX',(d)=>d3.event.x)
        .attr('targetY',(d)=>d3.event.y)
        .attr('d', (d) => {     
          // calculate the d attribute for path
              return `M${d3.select(this).attr('cx')},${d3.select(this).attr('cy')}L${d3.event.x},${d3.event.y}`;
            })
          // set arrow style
          .style('marker-end', 'url(#end-arrow)');
    
    
      })
      .on('end', function(d) {
        d3.select(this).classed("dragging", false);
    
        var targetNodeId;
        var targetLinkwordId;
        if(d3.select('svg').attr('endNodeId')!==null){
          targetNodeId = parseInt(d3.select('svg').attr('endNodeId'));
        }
        if(d3.select('svg').attr('endLinkwordId')!==null){
          targetLinkwordId = parseInt(d3.select('svg').attr('endLinkwordId'));
        }
    
        // avoid create path to itself
        if(parseInt(d3.select('svg').attr('startLinkwordId'))===targetLinkwordId) {
          d3.selectAll('path.dragLine').remove();
          return;
        } 
    
        if(targetLinkwordId===undefined&&targetNodeId===undefined){
          d3.selectAll('path.dragLine').remove();
          return;
        } 
    
        var sourceLinkword;
        for(var i = 0;i<linkwords.length;i++){
          if(linkwords[i]['id']===parseInt(this.id)){
            sourceLinkword = linkwords[i];
          }
        }
       if(targetNodeId===undefined){
        var endLinkword;
        for(var i = 0;i<linkwords.length;i++){
          if(linkwords[i]['id']===parseInt(targetLinkwordId)){
            endLinkword = linkwords[i];
          }
        }
    
        //don't create duplicated link
        var duplicated=false;
        for(var i=0;i<links.length;i++){
          if(links[i]['id']==='b'+this.id+' b'+targetLinkwordId){
            duplicated=true;
            d3.selectAll('path.dragLine').remove();
            return;
          }
        }
          links.push({
          source: sourceLinkword,
          target: endLinkword,
          left: false,
          right: true,
          id: 'b'+this.id+' b'+targetLinkwordId
    
        })
    
        // append a temporaty path because the path generated from data will be shown by next click
        d3.select('svg')
        .append('svg:path')
        .attr('class','temp')
        .attr('sourceX',(d)=>d3.select(this).attr('cx'))
        .attr('sourceY',(d)=>d3.select(this).attr('cy'))
        .attr('targetX',(d)=>endLinkword['x'])
        .attr('targetY',(d)=>endLinkword['y'])
        .attr('d', (d) => {     
          // calculate the d attribute for path
              return `M${d3.select(this).attr('cx')},${d3.select(this).attr('cy')}L${endLinkword['x']},${endLinkword['y']}`;
            })
          // set arrow style
          .style('marker-end', 'url(#end-arrow)');
     
        }
        else{
          var endNode;
          for(var i = 0;i<nodes.length;i++){
            if(nodes[i]['id']===parseInt(targetNodeId)){
              endNode = nodes[i];
            }
          }
          //don't create duplicated link
          var duplicated=false;
          for(var i=0;i<links.length;i++){
           if(links[i]['id']==='b'+this.id+' a'+targetNodeId){
            duplicated=true;
            d3.selectAll('path.dragLine').remove();
            return;
           }
         }
            links.push({
            source: sourceLinkword,
            target: endNode,
              left: false,
              right: true,
              id: 'b'+this.id+' a'+targetNodeId
            })
             // append a temporaty path because the path generated from data will be shown by next click
        d3.select('svg')
        .append('svg:path')
        .attr('class','temp')
        .attr('sourceX',(d)=>d3.select(this).attr('cx'))
        .attr('sourceY',(d)=>d3.select(this).attr('cy'))
        .attr('targetX',(d)=>endNode['x'])
        .attr('targetY',(d)=>endNode['y'])
        .attr('d', (d) => {     
          // calculate the d attribute for path
              return `M${d3.select(this).attr('cx')},${d3.select(this).attr('cy')}L${endNode['x']},${endNode['y']}`;
            })
          // set arrow style
          .style('marker-end', 'url(#end-arrow)');
        }

        d3.selectAll('path.dragLine').remove();
        
     }))
      
       gLinkWord
       .append('svg:text')
       .attr('class', 'linkword')
       .attr('x', (d) => d.x)
       .attr('y', (d) => d.y)
       .attr('id',(d)=>'lText'+d.id)
       .attr('fill', 'red')
       .attr('font-size', '5')
       .attr('text-anchor', 'middle')
       .text((d) => d.text)
       ;


// change the size of ellipse to cover the text
    for(var id = 0;id<parseInt(linkwords.length);id++){
      var textLength = svg.selectAll('g.linkword').filter(function(a,i){
       return i===id}).attr('length');
       svg.selectAll('ellipse.linkword').filter(function(a,i){
        return i===id;}).attr('rx', parseInt(textLength)*2.5+8)
    }

    
    
// start state
// d3.select('svg').attr('clickOnNode', 'false');
    
            //   d3.select('svg').selectAll('rect.gRect').attr('visibility', 'hidden');
            //     d3.select('svg').selectAll('text.gText').attr('visibility', 'hidden');
            //     d3.select('svg').selectAll('image.gImage').attr('visibility', 'hidden');
              d3.select('svg').selectAll('ellipse.node').on('click', 
              (d)=> {      
                  
                var id = d['id'];

                //  important: in modification mode svg will return to start state after dragging slider
                

                if(d3.event.button === 0 && d3.select('svg').selectAll('ellipse.node').filter(function(a,i){
                    return parseInt(a['id'])===id}).style('fill')!=='grey'){

     
                if(d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                  return parseInt(a['id'])===id}).attr('visibility')==='hidden'){
                    d3.select('svg').attr('clickOnNode', 'true');
                  }
                  else{
                    d3.select('svg').attr('clickOnNode', 'false');
                  }
    
    
                  d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                    return parseInt(a['id'])===id}).attr('visibility', 
                    d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return parseInt(a['id'])===id}).attr('visibility')==='hidden'?'visible':'hidden'
                    );
                  d3.select('svg').selectAll('text.gText').filter(function(a,i){
                      return parseInt(a['id'])===id}).attr('visibility', 
                      d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                        return parseInt(a['id'])===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                    );
                  d3.select('svg').selectAll('image.gImage').filter(function(a,i){
                      return parseInt(a['id'])===id}).attr('visibility', 
                      d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                        return parseInt(a['id'])===id}).attr('visibility')==='hidden'?'hidden':'visible'              
                    );

      
                    d3.select('svg').selectAll('rect.gRect').filter(function(a,i){
                      return parseInt(a['id'])!==id}).attr('visibility', 
                      'hidden'
                      );
                    d3.select('svg').selectAll('text.gText').filter(function(a,i){
                        return parseInt(a['id'])!==id}).attr('visibility', 
                        'hidden'
                        );
                    d3.select('svg').selectAll('image.gImage').filter(function(a,i){
                          return parseInt(a['id'])!==id}).attr('visibility', 
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
                          this.modifyNode(id, nodes, gTexts, glossaries);

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

            gTexts.push({text: 'example text',
              target: nodes[id],
              hidden: true,
              page: '1',
              id: id.toString(),
            })

            d3.select('svg').select('g.create').attr('visibility','hidden')

            // input the text in created ellipse
            this.modifyNode(id, nodes, gTexts, glossaries);
          })


          d3.select('svg').select('foreignObject.create2')
          .on('mousedown',(d)=>{

            var idLinkWord = parseInt(linkwords.length);

            linkwords.push({id: parseInt(linkwords.length), text: "default", x: parseInt(d3.select('foreignObject.create1')
            .attr('x')), 
            y: parseInt(d3.select('foreignObject.create1')
            .attr('y'))});

            d3.select('svg').select('g.create').attr('visibility','hidden')

            this.modifyLinkword(id, linkwords);


          }
        )
          
      }
      
    })

    return [svg, circle, path, glossary, gText, gImage, linkword, circleNextMap, routerLink];
    
    
      }
  }




