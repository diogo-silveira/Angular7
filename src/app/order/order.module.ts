import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderNewComponent } from './order-new/order-new.component';

import { OrderService } from './order.service';
import { OrderRoute } from './order.route';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CommonModule } from '@angular/common';  
import { FakeData } from '../core/data/data.component';
import { MessageComponent } from '../components/message/message.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    OrderListComponent,
    OrderNewComponent,
    
  ],
  imports: [
    OrderRoute,
    CommonModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [OrderService,FakeData,MessageComponent]
})
export class OrderModule { }
