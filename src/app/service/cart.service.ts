import { appconfig } from '@appconfig/appconfig'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; 
import { HandleErrorResponse } from './HandleErrorResponse';

@Injectable({ providedIn: 'root' })
export class CartService {
	public DISH_IN_CART: any = [];
	public TABLE_IN_CART: any = [];

    constructor(private toastr: ToastrService, private router: Router, private http: HttpClient,
      private handleError: HandleErrorResponse
    ) {
    }

	getListDishInCart(accessToken: any, successCallback: (resp: any) => void){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
            'access_token': accessToken
		});
		return this.http.get<Response>(`${appconfig.HOST_PRODUCT}/api/product/user/cart/dish`, {headers}).subscribe({
            next: (data: any) => {
              successCallback(data.data);
            },
            error: (error) => {
              this.handleError.checkaccessToken(error);
            },
            // complete() {
            // },
          });
		
	}
    
    addDishToCart(reqData: any, successCallback: (resp: any) => void) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
            'access_token': reqData.accessToken
		});
        reqData.accessToken = undefined;
		return this.http.post<any>(`${appconfig.HOST_PRODUCT}/api/product/user/cart/dish`, reqData, { headers }).subscribe({
			next: (data: any) => {
				successCallback(data);
			},
			error: (error) => {
				this.handleError.handle(error);
			},
			// complete() {
			// },
		});
	}

	deleteDishInCart(reqData: any, successCallback: (resp: any) => void){
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
            'access_token': reqData.accessToken
		});
		return this.http.delete<Response>(`${appconfig.HOST_PRODUCT}/api/product/user/cart/dish/${reqData.dishId}`, {headers}).subscribe({
            next: (data: any) => {
              successCallback(data.data);
            },
            error: (error) => {
              this.handleError.checkaccessToken(error);
            },
            // complete() {
            // },
          });
		
	}
}