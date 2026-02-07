import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Common } from '../common';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
 @Output() toggleSidebar = new EventEmitter<void>();
  pageTitle:any;

  constructor(
    private router: Router,
    private commonService:Common
  ) {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     const route = this.router.url.split('/')[1];
    //     this.pageTitle = this.formatTitle(route);
    //   });
  }

  ngOnInit(): void {
    this.pageTitle = this.commonService.selectedTitle;
  }

  formatTitle(route: string): string {
    if (!route) return 'Dashboard';
    return route.replace('-', ' ').toUpperCase();
  }

  isLogout() {
    localStorage.removeItem('user')
    this.router.navigate(['auth/login'])
  }
}
