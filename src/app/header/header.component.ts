import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  constructor(private spinner: NgxSpinnerService, private router: Router, public authService: AuthService,
    public cartService: CartService
  ){}
  ngOnInit(): void {
    this.checkIsLogin();
    this.getListDishInCart();
  }

  logout(){
    this.spinner.show();
    this.authService.logout(this.authService.getAccessToken(),(data)=>{
      this.spinner.hide();
      this.router.navigate(['/login'], {});
    });
  }

  checkIsLogin(){
    let accessToken = this.authService.getAccessToken();
    if(accessToken){
      this.spinner.show();
      this.authService.getProfile(accessToken,(respData)=>{
        this.spinner.hide();
        this.authService.PROFILE = respData;
        this.authService.isAuthenticated = true;
      }, (error)=>{
        this.spinner.hide();
        this.authService.isAuthenticated = false;
      })
    }
  }

  getListDishInCart(){
    let accessToken = this.authService.getAccessToken();
    if(accessToken){
      this.cartService.getListDishInCart(accessToken, (dishs)=>{
        this.spinner.hide();
        this.cartService.DISH_IN_CART = dishs;
      })
    }
  }
    
}
