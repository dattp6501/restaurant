import { appconfig } from '@appconfig/appconfig'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'; 
import { HandleErrorResponse } from './HandleErrorResponse';

@Injectable({ providedIn: 'root' })
export class TableService {

    constructor(private toastr: ToastrService, private router: Router, private http: HttpClient,
      private handleError: HandleErrorResponse
    ) {
    }
    getListTable(successCallback: (data: any) => void) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
          });
        return this.http.get<Response>(`${appconfig.HOST_PRODUCT}/api/product/user/table`, {headers}).subscribe({
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

    getTableDetail(reqData: any,successCallback: (data: any) => void) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json', // Có thể thay đổi loại nội dung nếu cần
          });
        return this.http.get<Response>(`${appconfig.HOST_PRODUCT}/api/product/user/table/${reqData.tableId}`, {headers}).subscribe({
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