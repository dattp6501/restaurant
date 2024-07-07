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

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  public formCheckout!: FormGroup;
  public selectedPeriod: any;
  public listPeriod: any[] = [];
  public BOOKING_INFO: any;
  public date: any;
  constructor(private spinner: NgxSpinnerService, public cartService: CartService,
    private orderService: OrderService, private router: Router,
    private authService: AuthService, private toastr: ToastrService, private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.date = new FormControl(new Date())
    this.formCheckout = this.formBuilder.group({
      "customerName": [this.authService.PROFILE.custemerFullname, Validators.required]
    });
    this.checkPeriod();
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

  checkPeriod() {
    this.BOOKING_INFO = {
      "price": 0
    };
    this.listPeriod = [
      {
        "from": "07:30",
        "to": "09:00"
      },
      {
        "from": "09:30",
        "to": "11:00"
      },
    ]
    this.selectedPeriod = this.listPeriod[0];
  }

  checkout() {
    let customerName = this.fc['customerName'].value;
    let from = moment(this.date.value).format("YYYY/MM/DD ") + this.selectedPeriod.from;
    let to = moment(this.date.value).format("YYYY/MM/DD ") + this.selectedPeriod.to;
    let reqData = {
      "from": from,
      "to": to,
      "custemerFullname": customerName,
      "tables": this.cartService.TABLE_IN_CART,
      "dishs": this.cartService.DISH_IN_CART,
      "description": "test",
      "accessToken": this.authService.getAccessToken()
    };
    console.log(reqData);
    // this.spinner.show();
    // this.orderService.createOrder(reqData,(respData)=>{
    //   this.spinner.hide();
    //   this.router.navigate(['/table'], {});
    // })
  }
}
