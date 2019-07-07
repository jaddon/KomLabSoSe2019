import { Component, OnInit } from '@angular/core';
import {TestMapService} from '../../testMap.service';
@Component({
  selector: 'app-singlechoicetest3',
  templateUrl: './singlechoicetest3.component.html',
  styleUrls: ['./singlechoicetest3.component.css']
})
export class Singlechoicetest3Component implements OnInit {
  public questions:any = [
    {
      question: "Where does the local variable function?",
      items:["A.  In the function or block in which it is declared","B. This package","C. This class","D. This class and its subclass"],
      userchoice:"",
      rightanswer: "A",
      explanation: "explanation for the question 1"
    },
    {
      question: "Which description is right for constant variable?",
      items:["A. It can only be used in the function in which it is decalred","B. The value cannot change once it has been assigned","C. The value can change anytime","D. None of them"],
      userchoice:"",
      rightanswer: "B",
      explanation: "explanation for the question 2"
    },
    {
      question: "Which one is not a type of variable?",
      items:["A. int","B. number","C. double","D. boolean"],
      userchoice:"",
      rightanswer: "B",
      explanation: "explanation for the question 3"
    }
  ];
  public questionPosition: any = 0;
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
      this.testMapService.callServer('variable',resultAnswer,'choicetest')
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
