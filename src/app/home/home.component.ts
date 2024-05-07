import { DishService } from './../service/dish.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  banners?: any[] | []
  constructor(private dishService: DishService){

  }

  ngOnInit(): void {
    console.log("aaaa");
    this.getBanner();
  }

  getBanner(){
    this.dishService.getListDishHot((dishs)=>{
      this.banners = dishs;
    })
  }
}
