import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { Login } from './auth/login/login';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../app/core/main-layout/main-layout/main-layout-module')
        .then(m => m.MainLayoutModule)
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: "auth/login",
    component:Login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
