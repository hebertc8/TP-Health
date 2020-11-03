import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl:'./container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  menu: any = [];
  ngOnInit() {
    this.menu = [
      {
      title: 'home',
      link: '/container/main',
      icon: 'home-outline'
    }
  ];
  }
}

