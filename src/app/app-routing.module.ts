import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { redirectUnauthorizedTo, canActivate, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToOverview = () => redirectLoggedInTo(['overview']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./root-page/root-page.module').then(m => m.RootPageModule),
    ...canActivate(redirectLoggedInToOverview),
  },
  {
    path: 'login',
    loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: 'overview',
    loadChildren: () => import('./overview-page/overview-page.module').then(m => m.OverviewPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks-page/tasks-page.module').then(m => m.TasksPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'account',
    loadChildren: () => import('./account-page/account-page.module').then(m => m.AccountPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
