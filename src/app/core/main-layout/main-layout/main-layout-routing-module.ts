import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from '../main-layout';
import { Dashboard } from '../../dashboard/dashboard';

const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component:Dashboard
      },
      {
        path: 'products',
        loadChildren: () =>
          import('../../product-details/products/products-module')
            .then(m => m.ProductsModule)
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('../../customers/customer/customer-module')
            .then(m => m.CustomerModule)
      },
      {
        path: 'stocks',
        loadChildren: () =>
          import('../../stock-management/stocks/stocks-module')
            .then(m => m.StocksModule)
      },
      {
        path: 'zinc',
        loadChildren: () =>
          import('../../zinc-details/zinc-details/zinc-details-module')
            .then(m => m.ZincDetailsModule)
      },
      {
        path: 'daily-manufacture',
        loadChildren: () =>
          import('../../manufacturing/manufacture/manufacture-module')
            .then(m => m.ManufactureModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
