import { Component } from '@angular/core';
import { WalletService } from '../../core/services/wallet.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-recharge',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatInputModule],
  templateUrl: './recharge.component.html',
  styleUrl: './recharge.component.scss'
})
export class RechargeComponent {
amount!: number;

  constructor(private wallet: WalletService) {}

  recharge() {
    this.wallet.recharge(this.amount).subscribe({
      next: () => alert('Recharge successful'),
      error: err => alert(err.error?.error || err.error)
    });
  }
}
