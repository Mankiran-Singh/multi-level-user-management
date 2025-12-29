import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../shared/navbar/navbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 user: any;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.me().subscribe(user => {
      this.user = user;
    });
  }
}
