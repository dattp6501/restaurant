import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../service/order.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

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
  constructor(private spinner: NgxSpinnerService, public cartService: CartService,
    private orderService: OrderService, private router: Router,
    private authService: AuthService, private toastr: ToastrService, private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.spinner.show();
    let now = Date.now();
    this.formCheckout = this.formBuilder.group({
      customerName: ['', Validators.required],
      from: [new DatePipe("en-US").transform(now,"HH:mm:ss dd/MM/yyyy"), Validators.required],
      to: [new DatePipe("en-US").transform(now,"HH:mm:ss dd/MM/yyyy"), Validators.required],
    });
    this.checkPeriod();
  }

  get fc() { return this.formCheckout.controls; }

  checkPeriod() {
    this.BOOKING_INFO = {
      "price": 0
    };
    this.listPeriod = [
      {
        "from": "08:00",
        "to": "12:00"
      }
    ]
    this.spinner.hide();
  }

  checkout() {
    let customerName = this.fc['customerName'].value;
    let from = this.fc['from'].value;
    let to = this.fc['to'].value;
    let reqData = {
      "from": from,
      "to": to,
      "custemerFullname": customerName,
      "tables": this.cartService.TABLE_IN_CART,
      "description": "test",
      "accessToken": this.authService.getAccessToken()
    };
    this.spinner.show();
    this.orderService.createOrder(reqData,(respData)=>{
      this.spinner.hide();
      this.router.navigate(['/table'], {});
    })
  }
}
