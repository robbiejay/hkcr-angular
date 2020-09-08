import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DonateService } from '../../../../_services/donate.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-donate-split',
  templateUrl: './donate-split.component.html',
  styleUrls: ['./donate-split.component.scss'],
  providers: [DecimalPipe]
})
export class DonateSplitComponent implements OnInit {

  form: FormGroup;
  donation: number;
  constructor(private donateService: DonateService,
              private decimalPipe: DecimalPipe) { }

  ngOnInit() {
      this.donateService.donateAmountStateChange.subscribe(value => {
        this.donation = value;
      });
    this.form = new FormGroup({
      split: new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    })

  this.form.get('split').setValue(50);

  console.log(this.donateService.donateAmount);
  }

  onFormSubmit() {
    console.log(this.form);
    let residentDonation =  this.decimalPipe.transform(this.donation - this.donation * this.form.value.split / 100, '1.2-2');
    let hkcrDonation = this.decimalPipe.transform(this.donation * this.form.value.split / 100, '1.2-2');
    this.advanceToSlide4();
  }

  advanceToSlide2() {
    this.donateService.changeSlide('slide2');
  }

  advanceToSlide4() {
    this.donateService.changeSlide('slide4');
  }

}
