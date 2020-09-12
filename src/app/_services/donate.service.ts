import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

public donateAmount: number;
donateAmountStateChange: Subject<number> = new Subject<number>();

public residentAmount: string;
residentDonateStateChange: Subject<string> = new Subject<string>();

public hkcrAmount: string;
hkcrDonateStateChange: Subject<string> = new Subject<string>();

public paymentConfirmedBool: boolean;
public paymentConfirmedStateChange: Subject<boolean> = new Subject<boolean>();

public donateSlideState: string;
donateStateChange: Subject<string> = new Subject<string>();
  constructor() {
    this.donateStateChange.subscribe(value => {
      this.donateSlideState = value;
    })

    this.donateAmountStateChange.subscribe(value => {
      this.donateAmount = value;
    })

    this.residentDonateStateChange.subscribe(value => {
      this.residentAmount = value;
    })

    this.hkcrDonateStateChange.subscribe(value => {
      this.hkcrAmount = value;
    })

    this.paymentConfirmedStateChange.subscribe(value => {
      this.paymentConfirmedBool = value;
    })
   }

   updateDonation(number){
     this.donateAmountStateChange.next(number);
   }

   changeSlide(number) {
     this.donateStateChange.next(number)
   }

   updateResidentDonation(number) {
     this.residentDonateStateChange.next(number)
   }

   updateHkcrDonation(number) {
     this.hkcrDonateStateChange.next(number)
   }

   paymentConfirmed() {
     this.paymentConfirmedStateChange.next(true);
     this.donateStateChange.next('slide1');
   }
}
