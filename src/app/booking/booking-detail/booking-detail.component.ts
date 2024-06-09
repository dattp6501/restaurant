import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../../service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent implements OnInit{
  public BOOKING: any[]=[];
  constructor(private spinner: NgxSpinnerService, private orderService: OrderService, private router: Router,
    private authService: AuthService, private toastr: ToastrService, private route: ActivatedRoute

  ) {

  }
  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getBookingDetail(id);
    });
    
  }

  getBookingDetail(id: number){
    let accessToken = this.authService.getAccessToken();
    this.orderService.getOrderDetail(accessToken,id,(booking)=>{
      this.spinner.hide();
      this.BOOKING = booking;
    })
  }
}
