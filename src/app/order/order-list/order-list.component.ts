import { Component, OnInit } from '@angular/core';
import { OrderService } from "../order.service";
import { FakeData } from '../../core/data/data.component';
import { MessageComponent } from '../../../app/components/message/message.component';
import { MessageType } from '../../../app/core/enums/message-type.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  //data table list
  private listOrder: any[];
  public row:any;
  //cols of the data table filter
  cols = [{ name: 'OrdeNumber' }, 
  { name: 'ConsumerName' },
  { name: 'ShippingAddress' },
  { name: 'Description' },
  { name: 'SupplierCode' }];
  //temp variable to keep the filtered data
  tempFilter = [];

  constructor(private orderService: OrderService, 
              private fakeData: FakeData, 
              private message: MessageComponent,
              private router: Router) 
              { }

  //getAllOrders method to use in case running the app with the API, otherwise it will use a fake data
  public getAllOrders() {
    this.orderService.getAllOrders().subscribe(response => {
      if (response.success === true) {
        var result = response.data;
        this.listOrder = result;
      } error => {
        this.message.showNotification(MessageType.error, 'Error', 'Internal API error')
      }
    });
  }

  public setFakeData() {
    this.listOrder = this.fakeData.object.Orders;
    this.tempFilter = this.listOrder;
  }

  ngOnInit() {
    //this.getAllOrders(); //TODO: Use getAllOrders when request data from the API
    this.setFakeData();
  }

  deleteItem(row)
  {
    debugger
  }
  
  updateItem(row)
  {
    this.row = row;
    this.router.navigate(['order/order-new', row.OrderNumber]);
  }
  
  //data table filter
  updateFilter(event) {
    let val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    let colsAmt = this.cols.length;
    // get the key names of each column in the dataset
    let keys = Object.keys(this.tempFilter[0]);
    // assign filtered matches tok the active datatable
    const temp = this.tempFilter.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
    this.listOrder = temp;
  }

}
