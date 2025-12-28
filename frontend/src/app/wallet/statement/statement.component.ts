import { Component } from '@angular/core';
import { WalletService } from '../../core/services/wallet.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [MatCardModule, MatTableModule, DatePipe, MatButtonModule, MatInputModule],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.scss'
})
export class StatementComponent {
transactions: any[] = [];

  constructor(private wallet: WalletService) {}

  ngOnInit() {
    this.wallet.statement().subscribe((res: any) => {
      this.transactions = res;
    });
  }
}
