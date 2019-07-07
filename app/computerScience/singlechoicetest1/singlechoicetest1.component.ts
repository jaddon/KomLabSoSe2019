import { Component, OnInit } from '@angular/core';
import {TestMapService} from '../../testMap.service';
@Component({
  selector: 'app-singlechoicetest1',
  templateUrl: './singlechoicetest1.component.html',
  styleUrls: ['./singlechoicetest1.component.css']
})
export class Singlechoicetest1Component implements OnInit {
  public questionPosition: any = 0;
  public textNow: string = '';
  constructor(private testMapService: TestMapService) { }
  public questions: any= [
    {
      question: "Which languange does java belong to?",
      items:["A. Machine Language","B.Assembly Language","C. High-Level Language","D. None of them"],
      userchoice:"",
      rightanswer: "C",
      explanation: "explanation for the question 1"
    },
    {
      question: "Which error is not included by bug?",
      items:["A. logic error","B.run-time error","C. syntax error","D. compile-time error"],
      userchoice:"",
      rightanswer: "C",
      explanation: "explanation for the question 2"
    },
    {
      question: "Which tool could translate source code into machine code?",
      items:["A. intepreter","B. compiler","C. argotithm","D. debug"],
      userchoice:"",
      rightanswer: "A",
      explanation: "explanation for the question 3"
    }
  ];
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
  }ngOnInit() {
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
      this.testMapService.callServer('computer science',resultAnswer,'choicetest')
    }
    (<HTMLInputElement>document.getElementById('submit')).disabled = true;
    this.textNow = str;

  }
  questionPre
  check(){

    for(let i=0;i<this.questions.length;i++){
      if(this.questions[i].userchoice ==='')
        return true;
    }

    return false;

  }

}
