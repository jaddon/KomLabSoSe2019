import { Component, OnInit } from '@angular/core';
import {Question} from './Question';
import {init} from 'protractor/built/launcher';

@Component({
  selector: 'app-singleChoice',
  templateUrl: './singleChoice.component.html',
  styleUrls: ['./singleChoice.component.css']
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
  public thisQuestion: Question = this.questions[this.questionPosition];
  public textNow: string = '';
  constructor() { }
  ngOnInit() {
    if(this.questionPosition === 0){
      (<HTMLInputElement>document.getElementById('previous')).disabled = true;
    }
  }
  initQuestion(){
    this.textNow = '';
    document.getElementById('labelA').style.color = 'black';
    document.getElementById('labelB').style.color = 'black';
    document.getElementById('labelC').style.color = 'black';
    document.getElementById('labelD').style.color = 'black';
  }
  submitAnswer(){
    if(this.thisQuestion.userchoice ===""){
      window.alert("You should have a choice!");
    }else if(this.thisQuestion.userchoice === this.thisQuestion.rightanswer){
      this.textNow += 'You have a right answer.\n' + this.thisQuestion.explanation;
      document.getElementById('label' + this.thisQuestion.rightanswer).style.color = 'greenyellow';
    }else{
      this.textNow += "Sorry the right answer is " + this.thisQuestion.rightanswer + '.\n'+ this.thisQuestion.explanation;
      document.getElementById('label' + this.thisQuestion.rightanswer).style.color = 'greenyellow';
      document.getElementById('label' + this.thisQuestion.userchoice).style.color = 'red';
    }

  }
  questionPrevious(){
    this.questionPosition -=1;
    if(this.questionPosition === 0){
      (<HTMLInputElement>document.getElementById('previous')).disabled = true;
    }
    (<HTMLInputElement>document.getElementById('next')).disabled = false;

    this.initQuestion();
    this.thisQuestion = this.questions[this.questionPosition]
  }
  questionNext(){
    this.questionPosition += 1;
    if(this.questionPosition === this.questions.length-1){
      (<HTMLInputElement>document.getElementById('next')).disabled = true;
    }
    (<HTMLInputElement>document.getElementById('previous')).disabled = false;
    this.initQuestion();
    this.thisQuestion = this.questions[this.questionPosition];
  }
}
