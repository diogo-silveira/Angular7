import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderNewComponent } from './order-new/order-new.component';


const routes: Routes = [
    { path: 'order/order-list', component: OrderListComponent },
    { path: 'order/order-new',      component: OrderNewComponent },
    { path: 'order/order-new/:id',      component: OrderNewComponent }
  ];
  

export const OrderRoute: ModuleWithProviders = RouterModule.forChild(routes);
