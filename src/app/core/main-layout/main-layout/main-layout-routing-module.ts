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
      {
        path: 'materials',
        loadChildren: () =>
          import('../../materials/material/material-module')
            .then(m => m.MaterialModule)
      },
      {
        path: 'add-material',
        title:"Add material",
        loadChildren: () =>
          import('../../add-material/add-material/add-material-module')
            .then(m => m.AddMaterialModule)
      },
      {
        path: 'add-manufacture',
        title:"Add Manufacture",
        loadChildren: () =>
          import('../../add-manufacture/add-manufacture/add-manufacture-module')
            .then(m => m.AddManufactureModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
