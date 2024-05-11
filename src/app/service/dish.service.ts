import { appconfig } from '@appconfig/appconfig'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; 
import { HandleErrorResponse } from './HandleErrorResponse';

@Injectable({ providedIn: 'root' })
export class DishService {

    constructor(private toastr: ToastrService, private router: Router, private http: HttpClient,
      private handleError: HandleErrorResponse
    ) {
    }
    getListDish(successCallback: (data: any) => void) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json', // Có thể thay đổi loại nội dung nếu cần
          });
        return this.http.get<Response>(`${appconfig.HOST_PRODUCT}/api/product/user/dish`, {headers}).subscribe({
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

    getDishDetail(reqData: any,successCallback: (data: any) => void) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json', // Có thể thay đổi loại nội dung nếu cần
          });
        return this.http.get<Response>(`${appconfig.HOST_PRODUCT}/api/product/user/dish/${reqData.dishId}`, {headers}).subscribe({
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

    getListDishHot(successCallback: (data: any) => void) {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json', // Có thể thay đổi loại nội dung nếu cần
      });
      return this.http.get<Response>(`${appconfig.HOST_PRODUCT}/api/product/user/dish/hot`, {headers}).subscribe({
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