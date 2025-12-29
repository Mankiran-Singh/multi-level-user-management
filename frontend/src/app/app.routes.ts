import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { DownlineComponent } from './users/downline/downline.component';
import { RechargeComponent } from './wallet/recharge/recharge.component';
import { CreditComponent } from './wallet/credit/credit.component';
import { StatementComponent } from './wallet/statement/statement.component';
import { RegisterComponent } from './auth/register/register.component';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
   { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
{ path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users/create', component: CreateUserComponent },
      { path: 'users/downline', component: DownlineComponent },
      { path: 'wallet/recharge', component: RechargeComponent },
      { path: 'wallet/credit', component: CreditComponent },
      { path: 'wallet/statement', component: StatementComponent }
    ]
  },

  { path: '**', redirectTo: 'login' }
];
