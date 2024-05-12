import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  public formCheckout!: FormGroup;
  public selectedPeriod: any;
  public listPeriod: any[] = [];
  public BOOKING_INFO: any;
  constructor(private spinner: NgxSpinnerService, public cartService: CartService,
    private authService: AuthService, private toastr: ToastrService, private formBuilder: FormBuilder
  ){

  }

  ngOnInit(): void {
    this.spinner.show();
    this.formCheckout = this.formBuilder.group({
      customerName: ['', Validators.required],
      mail: ['', Validators.required],
    });
    this.checkPeriod();
  }

  get fc() { return this.formCheckout.controls; }

  checkPeriod(){
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

  checkout(){
    console.log(this.fc['customerName'].value);
  }
}
