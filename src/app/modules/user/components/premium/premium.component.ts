import { Component } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css'],
})
export class PremiumComponent {
  constructor(private paymentServ: PaymentService) {}
  orderId: any;
  data: any;
  showLoading: any;
  pricing = [
    {
      name: 'Free',
      price: 0,
      features: [
        { feat: 'Unlimited Websites' },
        { feat: '1 User' },
        { feat: '100MB Space/website' },
        { feat: 'Continuous deployment' },
        { feat: 'No priority support' },
      ],
      btn: 'buy now',
    },
    {
      name: 'Pro',
      price: 109,
      features: [
        { feat: 'Unlimited Websites' },
        { feat: '5 User' },
        { feat: '512MB Space/website' },
        { feat: 'Continuous deployment' },
        { feat: 'Email Support' },
      ],
      btn: 'buy now',
    },
    {
      name: 'Enterprise',
      price: 189,
      features: [
        { feat: 'Unlimited Websites' },
        { feat: 'unlimited User' },
        { feat: 'unlimited Space/website' },
        { feat: 'Continuous deployment' },
        { feat: '24/7 Email support' },
      ],
      btn: 'buy now',
    },
  ];

  buyNow(price: Number) {
    this.showLoading = true;
    this.paymentServ.order(price).subscribe({
      next: (res) => {
        this.showLoading = false;
        this.orderId = res.id;
        const options = {
          key: environment.razorPayKey,
          amount: res.amount * 100,
          currency: 'INR',
          name: 'BeatBlend',
          description: 'Payment for Premium Plan',
          image: '',
          order_id: this.orderId,
          handler: (response: any) => {
            this.paymentResponseHandler(response);
          },
        };
        const rzp = new Razorpay(options);
        rzp.open();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
  paymentResponseHandler(response: any) {
    this.data = response;
    this.paymentServ.successPayent(this.data).subscribe({
      next: (res) => {},
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
