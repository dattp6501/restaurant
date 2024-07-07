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
import { BookingComponent } from './booking/booking.component';
import { BookingDetailComponent } from './booking/booking-detail/booking-detail.component';
import { TableFreetimeComponent } from './table-freetime/table-freetime.component';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"login", component: LoginComponent},
  // {path:"register", component: RegisterComponent},
  {path:"profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path:"dish", component: DishComponent},
  {path:"dish/:dish_id", component: DishDetailComponent},
  {path:"table", component: TableComponent},
  {path: "cart", component: CartComponent, canActivate: [AuthGuard]},
  {path:"notification", component: NotificationComponent, canActivate: [AuthGuard]},
  {path: "booking", component: BookingComponent, canActivate: [AuthGuard]},
  {path: "booking/:id", component: BookingDetailComponent, canActivate: [AuthGuard]},
  {path: "table-freetime", component: TableFreetimeComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],//{ useHash: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
