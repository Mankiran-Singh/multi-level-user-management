import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { BackButtonComponent } from "../../shared/back-button/back-button.component";
@Component({
  selector: 'app-downline',
  standalone: true,
  imports: [MatCardModule, MatTableModule, BackButtonComponent],
  templateUrl: './downline.component.html',
  styleUrl: './downline.component.scss'
})
export class DownlineComponent {
users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.downline().subscribe((res: any) => {
      this.users = res;
    });
  }
}
