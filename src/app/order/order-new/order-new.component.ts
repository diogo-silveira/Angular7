import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../order.service';
import { MessageComponent } from '../../../app/components/message/message.component';
import { MessageType } from '../../../app/core/enums/message-type.enum';
import { OrderListViewModel } from '../model/order-list-view';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FakeData } from '../../core/data/data.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.scss']
})
export class OrderNewComponent implements OnInit {

  orderNumber: number;
  orderModel: OrderListViewModel = {} as OrderListViewModel;
  params: any;

  orderForm: FormGroup;
  ordeNumberCtrl: FormControl;
  orderDateCtrl: FormControl;
  consumerNameCtrl: FormControl;
  shippingAddressCtrl: FormControl;
  shippingDateCtrl: FormControl;
  descriptionCtrl: FormControl;
  supplierCodeCtrl: FormControl;

   datePipe = new DatePipe('en-AU');

  FormErrors = {
    consumerName: {},
    shippingAddress: {},
    shippingDate: {},
    supplierCode: {}
  };


  constructor(private route: ActivatedRoute,
    private orderService: OrderService,
    private message: MessageComponent,
    public formBuilder: FormBuilder,
    private router: Router,
    private fakeData: FakeData) { }

  ngOnInit() {

    this.ordeNumberCtrl = this.formBuilder.control("new id");
    this.orderDateCtrl = this.formBuilder.control(this.datePipe.transform( Date.now(), 'dd/MM/yyyy'));
    this.consumerNameCtrl = this.formBuilder.control("", Validators.required);
    this.shippingAddressCtrl = this.formBuilder.control("", Validators.required);
    this.shippingDateCtrl = this.formBuilder.control("");
    this.descriptionCtrl = this.formBuilder.control("");
    this.supplierCodeCtrl = this.formBuilder.control("", Validators.required);

    this.orderForm = this.formBuilder.group({
      ordeNumber: this.ordeNumberCtrl,
      orderDate: this.orderDateCtrl,
      consumerName: this.consumerNameCtrl,
      shippingAddress: this.shippingAddressCtrl,
      shippingDate: this.shippingDateCtrl,
      description: this.descriptionCtrl,
      supplierCode: this.supplierCodeCtrl
    });

    this.params = this.route.params.subscribe(params => {
      this.orderNumber = +params['id']; // (+) converts string 'id' to a number

    });

    this.loadOrder();
  }

  private loadOrder() {

    if (this.orderNumber !== NaN) {

      var itemResult = this.fakeData.object.Orders.filter(x => x.OrderNumber == this.orderNumber)[0];
      if (itemResult) {
        this.ordeNumberCtrl.setValue(itemResult.OrderNumber);
        this.consumerNameCtrl.setValue(itemResult.ConsumerName);
        this.orderDateCtrl.setValue(this.datePipe.transform(itemResult.OrderDate, 'dd/MM/yyyy'));
        this.consumerNameCtrl.setValue(itemResult.ConsumerName);
        this.shippingAddressCtrl.setValue(itemResult.ShippingAddress);
        this.shippingDateCtrl.setValue(this.datePipe.transform(itemResult.ShippingDate, 'dd/MM/yyyy'));
        this.descriptionCtrl.setValue(itemResult.Description);
        this.supplierCodeCtrl.setValue(itemResult.SupplierCode);

      }
    }

  }

  private isValidForm() {
    for (const field in this.FormErrors) {
      if (!this.FormErrors.hasOwnProperty(field)) {
        continue;
      }

      // Clear previous errors
      this.FormErrors[field] = {};

      // Get the control
      const control = this.orderForm.get(field);

      if (control && !control.valid) {
        control.markAsDirty();
        this.FormErrors[field] = control.errors;
        return false;
      }
    }
    return true;
  }


  save() {

    if (!this.isValidForm()) {
      return this.orderForm;
    }

    //Enable the saveOrder() method in case using a API
    //saveOrder()

    //TODO:Save order to fake data list
    this.message.showNotification(MessageType.success, 'Save', 'New Order was saved successfully.');
    this.router.navigate(['order/order-list']);

  }

  private saveOrder() {

    this.orderService.save(this.orderModel, this.orderNumber).subscribe(response => {
      if (response.success === true) {

        this.message
          .showNotification(MessageType.success, 'Save', 'New Order was saved successfully.');

        this.router.navigate(['order/order-list']);

      } error => {
        this.message.showNotification(MessageType.error, 'Error', 'Internal API error')
      }
    });
  }

}


