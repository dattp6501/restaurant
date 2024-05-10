import { Component, OnInit } from '@angular/core';
import { DishService } from '../service/dish.service'; 
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css'
})
export class DishComponent implements OnInit{
  dishs? : any[] | null;
  constructor(private spinner: NgxSpinnerService, private dishService: DishService){
    
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

}