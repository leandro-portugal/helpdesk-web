import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TechnicalListComponent } from './components/technical/technical-list/technical-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TechnicalCreateComponent } from './components/technical/technical-create/technical-create.component';
import { TechnicalUpdateComponent } from './components/technical/technical-update/technical-update.component';
import { TechnicalDeleteComponent } from './components/technical/technical-delete/technical-delete.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { CustomerDeleteComponent } from './components/customer/customer-delete/customer-delete.component';
import { TicketListComponent } from './components/ticket/ticket-list/ticket-list.component';
import { TicketCreateComponent } from './components/ticket/ticket-create/ticket-create.component';
import { TicketUpdateComponent } from './components/ticket/ticket-update/ticket-update.component';
import { TicketReadComponent } from './components/ticket/ticket-read/ticket-read.component';

const routes: Routes = [
   {
      path: 'login', component:LoginComponent
   },
   {
    path: '',component: NavComponent, canActivate:[AuthGuard],children:[
      { path: 'home',component: HomeComponent},

      { path: 'technicals', component: TechnicalListComponent},
      { path: 'technicals/register', component: TechnicalCreateComponent},
      { path: 'technicals/update/:id', component: TechnicalUpdateComponent},
      { path: 'technicals/delete/:id', component: TechnicalDeleteComponent},

      { path: 'customers', component: CustomerListComponent},
      { path: 'customers/register', component: CustomerCreateComponent},
      { path: 'customers/update/:id', component: CustomerUpdateComponent},
      { path: 'customers/delete/:id', component: CustomerDeleteComponent},

      { path: 'tickets', component: TicketListComponent},
      { path: 'tickets/create', component: TicketCreateComponent},
      { path: 'tickets/update/:id', component: TicketUpdateComponent},
      { path: 'tickets/read/:id', component: TicketReadComponent}
    ]
   }
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
