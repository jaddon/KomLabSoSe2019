import { Component, OnInit } from '@angular/core';
import {Question} from './Questions';
import {saveAs} from 'file-saver';
import {init} from 'protractor/built/launcher';
import {TestMapService} from '../../testMap.service';

@Component({
  selector: 'app-singleChoice',
  templateUrl: './singleChoice.component.html',
  styleUrls: ['./singleChoice.component.css'],
  providers: [TestMapService]
})
export class SingleChoiceComponent implements OnInit {
  public questions: Question[] = [
    { question: "Which languange does java belong to?",
      items:["A. Machine Language","B.Assembly Language","C. High-Level Language","None of them"],
      userchoice:"",
      rightanswer: "C",
      explanation: "explanation for the question 1"
    },
    { question: "Which one is the division operator?",
      items: ["A.   /   ", "B.  \\  " ,"C.  *   ","D.   %   " ],
      userchoice:"",
      rightanswer: 'A',
      explanation: "explanation for the question 2"
    }
  ];
  public questionPosition: any = 0;
  //public thisQuestion: Question = this.questions[this.questionPosition];
  public textNow: string = '';
  constructor(private testMapService: TestMapService) { }
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
      this.testMapService.callServer('program',resultAnswer,'choicetest')
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
