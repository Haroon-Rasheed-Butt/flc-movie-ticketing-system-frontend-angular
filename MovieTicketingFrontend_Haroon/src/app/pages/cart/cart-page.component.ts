import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CheckoutResponse } from '../../models/checkout-response.model';
import { SAMPLE_ACCOUNTS } from '../../shared/constants';

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
    private readonly snackBar: MatSnackBar
  ) {
    this.checkoutForm = this.fb.group({
      accountId: [SAMPLE_ACCOUNTS[0].id, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const accountId = this.checkoutForm.value.accountId;
    this.isLoading = true;
    this.cartService.getCart(accountId).subscribe((items) => {
      this.cartItems = items;
      this.isLoading = false;
    });
  }

  checkout(): void {
    if (this.checkoutForm.invalid) {
      return;
    }
    const accountId = this.checkoutForm.value.accountId;
    this.cartService.checkout(accountId).subscribe((result) => {
      this.checkoutResult = result;
      this.snackBar.open('Checkout completed', 'Close', { duration: 3000 });
      this.loadCart();
    });
  }

  get totalAmount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.ticketPrice * item.quantity, 0);
  }
}
