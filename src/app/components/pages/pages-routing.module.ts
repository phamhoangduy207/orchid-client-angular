import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedsComponent } from './feeds/feeds.component';
import { OrchidComponent } from './orchid/orchid.component';
import { PagesComponent } from './pages.component';
import { SignoutComponent } from './signout/signout.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'orchid',
        component: OrchidComponent,
      },
      {
        path: 'feeds',
        component: FeedsComponent,
      },
      {
        path: 'signout',
        component: SignoutComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
