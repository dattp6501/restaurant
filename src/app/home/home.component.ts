import { NgxSpinnerService } from 'ngx-spinner';
import { DishService } from './../service/dish.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  banners?: any[] | []
  public notiContent: any = 'Welcomto DATTPMARS RESTAURANT!';
  constructor(private spinner: NgxSpinnerService, private dishService: DishService){

  }

  ngOnInit(): void {
    this.spinner.show();
    this.getBanner();
  }

  getBanner(){
    this.dishService.getListDishHot((dishs)=>{
      this.spinner.hide();
      this.banners = dishs;
    })
  }
}
