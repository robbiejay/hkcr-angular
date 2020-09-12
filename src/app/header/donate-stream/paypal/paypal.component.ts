import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { DonateService } from '../../../_services/donate.service';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  public payPalConfig ? : IPayPalConfig;

  constructor(private donateService: DonateService) { }
  paypalDonation: string;
  residentDonate: string;
  hkcrDonate: string;

  ngOnInit(): void {

    this.donateService.donateAmountStateChange.subscribe(value => {
      this.paypalDonation = JSON.stringify(value);

    });

    this.donateService.residentDonateStateChange.subscribe(value => {
      this.residentDonate = value;
    });

    this.donateService.hkcrDonateStateChange.subscribe(value => {
      this.hkcrDonate = value;
    });
    this.initConfig();


  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: 'AdxV64W1SJcg34qASEY7157989vYUAU1WN9PKxmuBHOOD1NEyxf6GE6nMYbxkSOeKSQC5RNY81ecFQCx',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.paypalDonation,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.paypalDonation,
              }
            }
          },
          items: [
            {
              name: this.residentDonate + ' | ' + this.hkcrDonate,
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.paypalDonation,
              },
            }
          ]
        }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'horizontal',
        color: 'silver',
      },
      onApprove: (data, actions) => {
        console.log('Transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.paymentAuthorised();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    }
  }

  paymentAuthorised() {
    this.donateService.paymentConfirmed();
  }

}
