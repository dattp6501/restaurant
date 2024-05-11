import { Component, OnInit } from '@angular/core';
import { DishService } from '../service/dish.service'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css'
})
export class DishComponent implements OnInit{
  dishs? : any[] | null;
  constructor(private spinner: NgxSpinnerService, private dishService: DishService, 
    private cartService: CartService, private authService: AuthService){
    
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getListDish();
  }

  getListDish(){
    this.dishService.getListDish((dishs)=>{
      this.spinner.hide();
      this.dishs = dishs;
    });
  }

  addDishToCart(dish: any){
    let reqData = {
      "accessToken": this.authService.getAccessToken(),
      "dishId": dish.id
    }
    this.spinner.show();
    this.cartService.addDishToCart(reqData, (respData)=>{
      this.cartService.getListDishInCart(this.authService.getAccessToken(),(dishs)=>{
        this.spinner.hide();
        this.cartService.DISH_IN_CART = dishs;
      })
    });
  }
}