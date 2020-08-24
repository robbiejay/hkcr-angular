import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-donate-stream',
  templateUrl: './donate-stream.component.html',
  styleUrls: ['./donate-stream.component.scss'],
  animations: [
    trigger('slide', [
      state('slide1', style({
        'margin-top':'0px'
      })),
      state('slide2', style({
        'margin-top':'-96px'
      })),
      state('slide3', style({
        'margin-top':'-192px'
      })),
      state('slide4', style({
        'margin-top':'-288px'
      })),
      transition('* => *', animate('333ms ease-in-out')),
    ])
  ]
})
export class DonateStreamComponent implements OnInit {

form: FormGroup;

donateState = 'slide1';
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({

    })
  }

  onFormSubmit() {
    console.log(this.form)
  }

  advanceToSlide1() {
      this.donateState = 'slide1';
  }

advanceToSlide2() {
    this.donateState = 'slide2';
}

advanceToSlide3() {
    this.donateState = 'slide3';
}

advanceToSlide4() {
    this.donateState = 'slide4';
}


}
