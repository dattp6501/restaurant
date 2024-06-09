import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../service/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{
  public LIST_BOOKING: any[]=[];
  constructor(private spinner: NgxSpinnerService,private orderService: OrderService, private router: Router,
    private authService: AuthService, private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.spinner.show();
    this.getListBooking();
  }

  getListBooking(){
    let accessToken = this.authService.getAccessToken();
    this.orderService.getListOrder(accessToken, (listbooking)=>{
      this.spinner.hide();
      this.LIST_BOOKING = listbooking;
    })
  }

  getorderDetail(booking: any){
    this.router.navigate([`/booking/${booking.id}`], {});
  }

}
