import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DishComponent } from './dish/dish.component';
import { DishDetailComponent } from './dish/dish-detail/dish-detail.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './service/guard.service';
import { CartComponent } from './cart/cart.component';
import { TableComponent } from './table/table.component';
import { NotificationComponent } from './notification/notification.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"login", component: LoginComponent},
  // {path:"register", component: RegisterComponent},
  {path:"profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path:"dish", component: DishComponent},
  {path:"dish/:dish_id", component: DishDetailComponent},
  {path:"table", component: TableComponent},
  {path: "cart", component: CartComponent, canActivate: [AuthGuard]},
  {path:"notification", component: NotificationComponent},
  {path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],//{ useHash: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
