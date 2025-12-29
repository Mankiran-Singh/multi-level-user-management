import { Component } from '@angular/core';
import { WalletService } from '../../core/services/wallet.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../core/services/user.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from "../../shared/back-button/back-button.component";

@Component({
  selector: 'app-credit',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, FormsModule, MatButtonModule, MatInputModule, MatSelectModule, CommonModule, BackButtonComponent],
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.scss'
})
export class CreditComponent {
  children: any;
  selectedChildId = '';
  amount!: number;
  
  constructor(
    private wallet: WalletService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadChildren();
  }

  loadChildren() {
    this.userService.children().subscribe({
      next: (res) => {
        
        this.children = res;
      },
      error: (err) => alert(err.error?.error || err.error)
    });
  }

  credit() {
    if (!this.selectedChildId || !this.amount) {
      alert('Please select a user and enter amount');
      return;
    }

    this.wallet.credit({
      childId: this.selectedChildId,
      amount: this.amount
    }).subscribe({
      next: () => alert('Credit successful'),
      error: err => alert(err.error?.error || err.error)
    });
  }
}
