import { Component, OnInit } from '@angular/core';
import {TestMapService} from '../../testMap.service';

@Component({
  selector: 'app-singlechoicetest5',
  templateUrl: './singlechoicetest5.component.html',
  styleUrls: ['./singlechoicetest5.component.css']
})
export class Singlechoicetest5Component implements OnInit {
  public questionPosition: any = 0;
  public textNow: string = '';
  constructor(private testMapService: TestMapService) { }
  public questions: any = [
    {
      question: "Which operator is used to create objects?",
      items:["A. final ","B. create","C. const","D. new"],
      userchoice:"",
      rightanswer: "D",
      explanation: "explanation for the question 1"
    },
    {
      question: "Array is a collection of ___",
      items:["A. element","B. index","C. type","D. number"],
      userchoice:"",
      rightanswer: "A",
      explanation: "explanation for the question 2"
    },
    {
      question: "Which one is a part of object",
      items:["A. library ","B. class","C. package","D. method"],
      userchoice:"",
      rightanswer: "D",
      explanation: "explanation for the question 3"
    }
  ];
  ngOnInit() {
    if(this.questionPosition === 0){
      (<HTMLInputElement>document.getElementById('previous')).disabled = true;
    }
  }
  submitAnswer(){
    var storeresult = [];
    for( var j=0; j<this.questions.length; j++){
      if( this.questions[j].userchoice === this.questions[j].rightanswer){
        storeresult.push({"result" : true})
      }else{
        storeresult.push({"result" : false})
      }
    }
    var str = ''
    var resultAnswer = {"true":"0","false":"0"};
    for(var i=0; i<this.questions.length;i++){
      str += 'Question' + (i+1).toString() +'\n';
      if(storeresult[i]['result']){
        resultAnswer['true'] = (parseInt(resultAnswer['true']) + 1).toString();
        str+= "Your answer is right.\n" + this.questions[i].explanation + '\n';
      }
      else{
        resultAnswer['false'] = (parseInt(resultAnswer['false']) + 1).toString();
        str += "Your answer is wrong.\n" + this.questions[i].explanation + '\n';
      }
      this.textNow = str;
      this.testMapService.callServer('object',resultAnswer,'choicetest')
    }
    (<HTMLInputElement>document.getElementById('submit')).disabled = true;
    this.textNow = str;
    //const blob = new Blob([JSON.stringify(storeresult)],{type:'application/json'});
    //saveAs(blob,'user1.json');

  }
  questionPrevious(){
    this.questionPosition -=1;
    if(this.questionPosition === 0){
      (<HTMLInputElement>document.getElementById('previous')).disabled = true;
    }
    (<HTMLInputElement>document.getElementById('next')).disabled = false;

  }
  questionNext(){
    this.questionPosition += 1;
    if(this.questionPosition === this.questions.length-1){
      (<HTMLInputElement>document.getElementById('next')).disabled = true;
    }
    (<HTMLInputElement>document.getElementById('previous')).disabled = false;
  }
  check(){

    for(let i=0;i<this.questions.length;i++){
      if(this.questions[i].userchoice ==='')
        return true;
    }

    return false;

  }

}
