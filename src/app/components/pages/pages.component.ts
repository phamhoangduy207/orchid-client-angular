import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-pages',
  template: `<nb-layout>
  <nb-layout-header fixed>
      <app-header></app-header>
  </nb-layout-header>
  <nb-layout-column>
      <router-outlet></router-outlet>
  </nb-layout-column>
  <nb-sidebar>
          <nb-menu tag="menu" [items]="items" autoCollapse="true">
          </nb-menu>
  </nb-sidebar>
  <nb-layout-footer>
      <b>Authors: Pham Hoang Duy, Le Minh Kha</b>
  </nb-layout-footer>
</nb-layout>`,

})
export class PagesComponent implements OnInit {
  constructor(private sidebarService: NbSidebarService) {}

  ngOnInit(): void {}

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  title = 'AngularApp';

  items: NbMenuItem[] = [
    {
      title: 'Dashboard',
      link: 'dashboard',
      icon: 'tv-outline',
    },
    {
      title: 'Orchid',
      link: 'orchid',
      icon: 'sun-outline',
    },
    {
      title: 'Feeds',
      link: 'feeds',
      icon: 'globe-outline',
    },
    {
      title: 'Profile',
      link: '',
      icon: 'person-outline',
    }, 
  ];
}
