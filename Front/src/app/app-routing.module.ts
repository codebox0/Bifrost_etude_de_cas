import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {FarmerViewComponent} from "./pages/farmer-view/farmer-view.component";
import {DashboardViewComponent} from "./pages/dashboard-view/dashboard-view.component";


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'farmer', component: FarmerViewComponent },
  { path: 'client', component: DashboardViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
