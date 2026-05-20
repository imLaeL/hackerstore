import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { CardListComponent } from './components/card/card';
import { AuthGuard } from './infra/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: CardListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
