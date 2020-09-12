import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';

import { LivestreamComponent } from './livestream/livestream.component';
import { RadiostreamComponent } from './radiostream/radiostream.component';
import { ChatangoComponent } from './chatango/chatango.component';
import { DonateStreamComponent } from './donate-stream/donate-stream.component';
import { DonateAmountComponent } from './donate-stream/forms/donate-amount/donate-amount.component';
import { DonateSplitComponent } from './donate-stream/forms/donate-split/donate-split.component';
import { PaypalComponent } from './donate-stream/paypal/paypal.component';


@NgModule({
  declarations:[
    LivestreamComponent,
    RadiostreamComponent,
    ChatangoComponent,
    DonateStreamComponent,
    DonateAmountComponent,
    DonateSplitComponent,
    PaypalComponent
  ],
  exports: [
    LivestreamComponent,
    RadiostreamComponent,
    ChatangoComponent,
    DonateStreamComponent,
    DonateAmountComponent,
    DonateSplitComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPayPalModule
  ]
})
export class StreamModule {}
