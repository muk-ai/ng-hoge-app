import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./root-page/root-page.module').then(m => m.RootPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule),
  },
  {
    path: 'overview',
    loadChildren: () => import('./overview-page/overview-page.module').then(m => m.OverviewPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
