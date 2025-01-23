import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConversationComponent } from './conversation/conversation.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'conversation',
    component: ConversationComponent,
    canActivate: [authGuard],
  },
];
