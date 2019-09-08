import { Injectable } from '@angular/core';
import { ApiUrl } from '../core/enums/api-url.enum';
import { HttpService } from '../core/services/http.service';
import { FakeData } from '../core/data/data.component';


@Injectable()

export class OrderService {

  constructor(private http: HttpService, private data: FakeData){}

  /**
   * API calls
   */
  public getAllOrders() {
    return this.http.get('order/getall', ApiUrl.Core);
  }

  private saveOrder(data:any) {
    return this.http.post('order/save', data, ApiUrl.Core);
  }

  private updateOrder( data:any, orderNumber : number) {
    return this.http.post('order/update', data, ApiUrl.Core);
  }

  private deleteOrder( data:any) {
    return this.http.post('order/delete', data, ApiUrl.Core);
  }

  //Save method
  public save( data:any, orderNumber : number ) {

    if(orderNumber <= 0)
    {
      //Enable this line to update through an API call 
      return this.updateOrder( data, orderNumber );
    } else
    {
      //Enable this line to save through an API call 
      return this.saveOrder(data);
    }
  }

  public delete( data:any) {

    if(data)
    {
      this.deleteOrder(data);
    }
  }
}
