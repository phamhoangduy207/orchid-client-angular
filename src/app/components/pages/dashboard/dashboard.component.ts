import { Component, OnInit } from '@angular/core';
import { FeedsComponent } from '../feeds/feeds.component';
import { OrchidComponent } from '../orchid/orchid.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orcCounter = 0;
  feedCounter = 0;
  constructor(private orchidComponent: OrchidComponent, private feedComponent: FeedsComponent) { 
    this.orcCounter = this.orchidComponent.counter;
    this.feedCounter = this.feedComponent.counter;
  }

  ngOnInit(): void {
  }

}
