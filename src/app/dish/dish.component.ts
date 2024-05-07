import { Component, OnInit } from '@angular/core';
import { DishService } from '../service/dish.service'; 

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrl: './dish.component.css'
})
export class DishComponent implements OnInit{
  dishs? : any[] | null;
  constructor(private dishService: DishService){
    
  }
  ngOnInit(): void {
    this.getListDish();
  }

  getListDish(){
    this.dishService.getListDish((dishs)=>{
      this.dishs = dishs;
    });
  }

}