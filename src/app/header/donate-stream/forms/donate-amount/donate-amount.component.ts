import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonateService } from '../../../../_services/donate.service';

@Component({
  selector: 'app-donate-amount',
  templateUrl: './donate-amount.component.html',
  styleUrls: ['./donate-amount.component.scss']
})
export class DonateAmountComponent implements OnInit {


  form: FormGroup;
  constructor(private donateService: DonateService) { }

  ngOnInit() {
    this.form = new FormGroup({
      amount: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.min(1)
        ]
      })
    })
  }

  donatePreset(amount) {
    this.form.get('amount').setValue(amount);
    this.onFormSubmit();

  }

  onFormSubmit() {
    console.log(this.form.value.amount);
    if(this.form.value.amount !== null && this.form.value.amount !==  0 && this.form.value.amount !==  '') {
    this.donateService.updateDonation(this.form.value.amount);
    this.advanceToSlide3();
  }
  }

  advanceToSlide1() {
    this.donateService.changeSlide('slide1');
  }

  advanceToSlide3() {
    this.donateService.changeSlide('slide3');
  }

}
