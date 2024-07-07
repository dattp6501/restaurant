import { AuthService } from './../service/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../service/cart.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { TableService } from '../service/table.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';

@Component({
  selector: 'app-table-freetime',
  templateUrl: './table-freetime.component.html',
  styleUrl: './table-freetime.component.css'
})
export class TableFreetimeComponent implements OnInit {
  public LIST_TIME: any[] = [];
  public selectedTime: any;
  public date: any;

  public TABLE_CONFIG: any;
  public dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private LIST_TABLE_SELECT: any[] = [];

  constructor(private spinner: NgxSpinnerService, public cartService: CartService, private tableService: TableService,
    private orderService: OrderService, private router: Router, private route: ActivatedRoute,
    private authService: AuthService, private toastr: ToastrService, private formBuilder: FormBuilder
  ) {

  }
  ngOnInit(): void {
    try {
      let dateParam = moment(this.route.snapshot.queryParamMap.get("date"), 'YYYY/MM/DD').toDate();
      if (dateParam.toString() == 'Invalid Date') throw Error("");
      this.date = new FormControl(dateParam);
    } catch (error) {
      this.date = new FormControl(new Date());
    }

    this.TABLE_CONFIG = {
      header: ['image', 'name', 'size', 'freetime', 'price', 'action'],
      pageSizeOptions: [10],
      totalLength: 10
    };
    this.initData();
  }

  async initData() {
    await this.getListTime();
    let from = moment(this.date).format("YYYY/MM/DD ") + this.selectedTime.from;
    let to = moment(this.date).format("YYYY/MM/DD ") + this.selectedTime.to;
    this.getTableFreeTime(from, to, 0, this.TABLE_CONFIG.pageSizeOptions[0]);
  }

  getTableFreeTime(from: any, to: any, page: any, size: any) {
    this.spinner.show();
    let reqData = {
      "from": from,
      "to": to,
      "accessToken": this.authService.getAccessToken()
    }
    this.tableService.getTableFreeTime(reqData, (tables) => {
      this.spinner.hide();
      this.dataSource = new MatTableDataSource<any>(tables);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator.length = 10;
    });
  }

  getListTime() {
    this.spinner.show();
    this.tableService.getListTime((times) => {
      this.spinner.hide();
      this.LIST_TIME = times;
      let timeIdParam = this.route.snapshot.queryParamMap.get("timeId");
      if (timeIdParam) {
        let timeParam = this.LIST_TIME.find(t => t.id == timeIdParam);
        if (timeParam) this.selectedTime = timeParam;
        else this.selectedTime = this.LIST_TIME[0];
      } else {
        this.selectedTime = this.LIST_TIME[0];
      }
    })
  }

  onPageChange(event: any) {
    this.spinner.show();
    let from = moment(this.date).format("YYYY/MM/DD ") + this.selectedTime.from;
    let to = moment(this.date).format("YYYY/MM/DD ") + this.selectedTime.to;
    this.getTableFreeTime(from, to, this.paginator.pageSize, 0);
  }
}
