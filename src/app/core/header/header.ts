import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private commonService: Common
  ) {
    const pageUrl = this.router.url.split('/')[2];
    // console.log(pageUrl);
    
    let pageTitle: any = this.commonService.menus.find((item) => item.route == `/${pageUrl}`)
    // console.log(pageTitle);
    
    this.commonService.setTitle(pageTitle['label'])
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
