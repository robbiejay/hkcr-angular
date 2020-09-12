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
          Validators.min(1),
          Validators.pattern("^[0-9]*$")
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
    console.log(this.form)
    if(this.form.status == 'VALID') {
    this.donateService.updateDonation(+this.form.value.amount);
    if (window.innerWidth > 768) {
    this.advanceToSlide3();
  } else {
    this.advanceToSlide5();
  }
  }
  }

  advanceToSlide1() {
    this.donateService.changeSlide('slide1');
  }

  advanceToSlide3() {
    this.donateService.changeSlide('slide3');
  }

  advanceToSlide5() {
    this.donateService.changeSlide('slide5');
  }

}
