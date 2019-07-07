import { Component, OnInit } from '@angular/core';
import {TestMapService} from '../../testMap.service';

@Component({
  selector: 'app-singlechoicetest7',
  templateUrl: './singlechoicetest7.component.html',
  styleUrls: ['./singlechoicetest7.component.css']
})
export class Singlechoicetest7Component implements OnInit {

  public questionPosition: any = 0;
  public textNow: string = '';
  constructor(private testMapService: TestMapService) { }
  public questions: any = [
    {
      question: "Which type of method can only be used in the class in where it is defined?",
      items:["A.  public","B. static","C. const","D. private"],
      userchoice:"",
      rightanswer: "D",
      explanation: "explanation for the question 1"
    },
    {
      question: "How many parameters should a function accept?",
      items:["A. 1","B. 2","C. 3","D. No limit.But it's better to split the large function into small ones to deal with a small set of parameters"],
      userchoice:"",
      rightanswer: "D",
      explanation: "explanation for the question 2"
    },
    {
      question: "Which symbol can be used to call a method in a class?",
      items:["A. : ","B. , ","C. . ","D. _ "],
      userchoice:"",
      rightanswer: "C",
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
      this.testMapService.callServer('method',resultAnswer,'choicetest')
    }
    (<HTMLInputElement>document.getElementById('submit')).disabled = true;
    this.textNow = str;


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
