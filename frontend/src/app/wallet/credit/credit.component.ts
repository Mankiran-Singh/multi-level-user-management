import { Component } from '@angular/core';
import { WalletService } from '../../core/services/wallet.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credit',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, FormsModule],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.scss'
})
export class CreditComponent {
 childId = '';
  amount!: number;

  constructor(private wallet: WalletService) {}

  credit() {
    this.wallet.credit({
      childId: this.childId,
      amount: this.amount
    }).subscribe({
      next: () => alert('Credit successful'),
      error: err => alert(err.error?.error || err.error)
    });
  }
}
