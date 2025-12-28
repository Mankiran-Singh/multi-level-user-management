import { Component } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { MatFormField } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [MatFormField,MatCardModule, FormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {
name = '';
  email = '';
  password = '';

  constructor(private userService: UserService) {}

  createUser() {
    this.userService.createUser({
      name: this.name,
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => alert('User created successfully'),
      error: err => alert(err.error?.error || err.error)
    });
  }
}
