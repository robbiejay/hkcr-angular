import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

public donateAmount: number;
donateAmountStateChange: Subject<number> = new Subject<number>();


public donateSlideState: string;
donateStateChange: Subject<string> = new Subject<string>();
  constructor() {
    this.donateStateChange.subscribe(value => {
      this.donateSlideState = value;
    })

    this.donateAmountStateChange.subscribe(value => {
      this.donateAmount = value;
    })
   }

   updateDonation(number){
     this.donateAmountStateChange.next(number);
   }

   changeSlide(number) {
     this.donateStateChange.next(number)
   }
}
