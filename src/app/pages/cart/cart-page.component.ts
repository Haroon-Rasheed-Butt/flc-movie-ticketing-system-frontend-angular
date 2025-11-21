import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CheckoutResponse } from '../../models/checkout-response.model';
import { SAMPLE_ACCOUNTS } from '../../shared/constants';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  sampleAccounts = SAMPLE_ACCOUNTS;
  checkoutResult: CheckoutResponse | null = null;
  isLoading = false;
  checkoutForm: FormGroup;

  constructor(
    private readonly cartService: CartService,
    private readonly fb: FormBuilder,
    private readonly messages: MessageService
  ) {
    this.checkoutForm = this.fb.group({
      accountId: [SAMPLE_ACCOUNTS[0].id, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const accountId = Number(this.checkoutForm.value.accountId);
    this.isLoading = true;
    this.cartService
      .getCart(accountId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((items) => {
        this.cartItems = items;
      });
  }

  checkout(): void {
    if (this.checkoutForm.invalid) {
      return;
    }
    const accountId = Number(this.checkoutForm.value.accountId);
    this.cartService.checkout(accountId).subscribe((result) => {
      this.checkoutResult = result;
      this.messages.show('Checkout completed', 'success');
      this.loadCart();
    });
  }

  get totalAmount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.ticketPrice * item.quantity, 0);
  }
}
