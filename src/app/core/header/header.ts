import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
 @Output() toggleSidebar = new EventEmitter<void>();
  pageTitle = 'Dashboard';

  constructor(private router: Router) {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     // const route = this.router.url.split('/')[1];
    //     // this.pageTitle = this.formatTitle(route);
    //   });
  }

  formatTitle(route: string): string {
    if (!route) return 'Dashboard';
    return route.replace('-', ' ').toUpperCase();
  }
}
