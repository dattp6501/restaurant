import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TableService } from '../service/table.service';
import { CartService } from '../service/cart.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  tables? : any[] = [];
  constructor(private spinner: NgxSpinnerService, private tableService: TableService, 
    private cartService: CartService, private authService: AuthService){
    
  }
  ngOnInit(): void {
    this.spinner.show();
    this.getListTable();
  }

  getListTable(){
    this.tableService.getListTable((tables)=>{
      this.spinner.hide();
      this.tables = tables;
    });
  }
}
