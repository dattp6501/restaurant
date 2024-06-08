import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { appconfig } from "@appconfig/appconfig";
import { ToastrService } from "ngx-toastr";
import { HandleErrorResponse } from "./HandleErrorResponse";



@Injectable({ providedIn: 'root' })
export class OrderService {

    constructor(private toastr: ToastrService, private router: Router, private http: HttpClient,
      private handleError: HandleErrorResponse
    ) {
    }

	// getListDishInCart(accessToken: any, successCallback: (resp: any) => void){
	// 	const headers = new HttpHeaders({
	// 		'Content-Type': 'application/json',
    //         'access_token': accessToken
	// 	});
	// 	return this.http.get<Response>(`${appconfig.HOST_PRODUCT}/api/product/user/cart/dish`, {headers}).subscribe({
    //         next: (data: any) => {
    //           successCallback(data.data);
    //         },
    //         error: (error) => {
    //           this.handleError.checkaccessToken(error);
    //         },
    //         // complete() {
    //         // },
    //       });
		
	// }
    
    createOrder(reqData: any, successCallback: (resp: any) => void) {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
            'access_token': reqData.accessToken
		});
        reqData.accessToken = undefined;
		return this.http.post<any>(`${appconfig.HOST_ORDER}/api/order/user/booking`, reqData, { headers }).subscribe({
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
}