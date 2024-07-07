import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../service/order.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import moment from 'moment';
import { TableService } from '../service/table.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  public formCheckout!: FormGroup;
  public LIST_TIME: any[] = [];
  public selectedTime: any;
  public BOOKING_INFO: any;
  public date: any;
  constructor(private spinner: NgxSpinnerService, public cartService: CartService, private tableService: TableService,
    private orderService: OrderService, private router: Router,
    private authService: AuthService, private toastr: ToastrService, private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.date = new FormControl(new Date());
    this.formCheckout = this.formBuilder.group({
    });
    this.getListTime();
  }

  deleteDishInCart(dishId: any){
    this.spinner.show();
    let reqData = {
      "dishId": dishId,
      "accessToken": this.authService.getAccessToken()
    }
    this.cartService.deleteDishInCart(reqData, (respData)=>{
      this.cartService.getListDishInCart(this.authService.getAccessToken(), (dishs)=>{
        this.spinner.hide();
        this.cartService.DISH_IN_CART = dishs;
      })
    });
  }

  get fc() { return this.formCheckout.controls; }

  getListTime() {
    this.spinner.show();
    this.tableService.getListTime((times) => {
      this.spinner.hide();
      this.LIST_TIME = times;this.selectedTime = this.LIST_TIME[0];
    })
  }

  checkout() {
    this.router.navigate(['/table-freetime'], {queryParams:{"date": moment(this.date.value).format("YYYY/MM/DD "), "timeId":this.selectedTime.id}});
    // let reqData = {
    //   "from": from,
    //   "to": to,
    //   "custemerFullname": customerName,
    //   "tables": this.cartService.TABLE_IN_CART,
    //   "dishs": this.cartService.DISH_IN_CART,
    //   "description": "test",
    //   "accessToken": this.authService.getAccessToken()
    // };
    // this.spinner.show();
    // this.orderService.createOrder(reqData,(respData)=>{
    //   this.spinner.hide();
    //   this.router.navigate(['/table'], {});
    // })
  }
}
