import { Component, OnInit } from '@angular/core';
import { DishService } from '../service/dish.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrl: './dish-detail.component.css'
})
export class DishDetailComponent implements OnInit{
  dish?: any | null;

  constructor(private route: ActivatedRoute, private dishService: DishService){
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['dish_id'];
      this.getDishDetail(id);
    });
  }

  getDishDetail(dishId : number){
    this.dishService.getDishDetail({dishId: dishId}, (dish)=>{
      this.dish = dish;
    });
  }
  
}