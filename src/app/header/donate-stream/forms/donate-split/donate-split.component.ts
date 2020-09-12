import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../../../_services/posts.service';
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
  currentShow = 'Residents';
  constructor(private donateService: DonateService,
              private postsService : PostsService,
              private decimalPipe: DecimalPipe) { }

  ngOnInit() {
    if(this.postsService.nowPlaying !== undefined) {
    this.currentShow = this.postsService.nowPlaying;
  }
      this.donateService.donateAmountStateChange.subscribe(value => {
        this.donation = value;
        console.log(this.donation);
      });
    this.form = new FormGroup({
      split: new FormControl(null, {
        validators: [
          Validators.required
        ]
      })
    })

  this.form.get('split').setValue(50);
  }

  onFormSubmit() {
    console.log(this.form);

    this.donateService.updateResidentDonation(this.currentShow + ' - ' + this.decimalPipe.transform(this.donation - this.donation * this.form.value.split / 100, '1.2-2'));
    this.donateService.updateHkcrDonation('HKCR - ' + this.decimalPipe.transform(this.donation * this.form.value.split / 100, '1.2-2'));
  if (window.innerWidth > 768) {
    this.advanceToSlide4();
  } else {
    this.advanceToSlide7();
  }
  }

  advanceToSlide2() {
    if (window.innerWidth > 768) {
    this.donateService.changeSlide('slide2');
  } else {
    this.donateService.changeSlide('slide3');
  }
  }

  advanceToSlide4() {
    this.donateService.changeSlide('slide4');
  }

  advanceToSlide7() {
    this.donateService.changeSlide('slide7');
  }

}
