import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Account } from '../../models/account.model';
import { Transaction } from '../../models/transaction.model';
import { SAMPLE_ACCOUNTS } from '../../shared/constants';
import { MessageService } from '../../core/services/message.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent {
  sampleAccounts = SAMPLE_ACCOUNTS;
  createdAccount: Account | null = null;
  displayAccount: Account | null = null;
  transactions: Transaction[] = [];

  accountForm: FormGroup;
  lookupControl: FormControl;

  constructor(
    private readonly accountService: AccountService,
    private readonly fb: FormBuilder,
    private readonly messages: MessageService
  ) {
    this.accountForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
    this.lookupControl = this.fb.control(SAMPLE_ACCOUNTS[0].id);
  }

  createAccount(): void {
    if (this.accountForm.invalid) {
      return;
    }
    this.accountService
      .createAccount(this.accountForm.value as {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
        rememberMe?: boolean;
      })
      .subscribe((account) => {
      this.createdAccount = account;
      this.messages.show('Account created', 'success');
    });
  }

  loadAccount(): void {
    const id = Number(this.lookupControl.value);
    this.accountService.getAccount(id).subscribe((account) => {
      this.displayAccount = account;
      this.accountService.getTransactions(id).subscribe((txs) => (this.transactions = txs));
    });
  }
}
