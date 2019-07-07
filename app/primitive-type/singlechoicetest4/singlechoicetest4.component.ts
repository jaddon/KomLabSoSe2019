import { Component, OnInit } from '@angular/core';
import {TestMapService} from '../../testMap.service';

@Component({
  selector: 'app-singlechoicetest4',
  templateUrl: './singlechoicetest4.component.html',
  styleUrls: ['./singlechoicetest4.component.css'],
  providers: [TestMapService]
})
export class Singlechoicetest4Component implements OnInit {
  public questionPosition: any = 0;
  public textNow: string = '';
  constructor(private testMapService: TestMapService) { }
  public questions: any = [
    {
      question: "Which one is not belong to primitive type?",
      items:["A.  int","B. boolean","C. double","D. object"],
      userchoice:"",
      rightanswer: "D",
      explanation: "explanation for the question 1"
    },
    {
      question: "Which description is right for primitive type?",
      items:["A. A primitive could have any length.","B. The primitive types can not be initialized with a literal","C. A smaller primitive type (byte) can contain less values than a bigger one","D. Primitive variable could not have methods"],
      userchoice:"",
      rightanswer: "C",
      explanation: "explanation for the question 2"
    },
    {
      question: "Primitive type can be tranformed with _____?",
      items:["A. subcalss ","B. superclass","C. wrapper class","D. None of them"],
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
      this.testMapService.callServer('primitive type',resultAnswer,'choicetest')
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
