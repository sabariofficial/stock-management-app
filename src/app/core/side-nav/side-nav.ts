import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Common } from '../common';

@Component({
  selector: 'app-side-nav',
  standalone: false,
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
})
export class SideNav {
@Output() closeSidebar = new EventEmitter<void>();
constructor(
  private route:Router,
  private commonService:Common
){}

  menus = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Stock Management', route: '/stocks' },
    { label: 'Material Management', route: '/materials' },
    { label: 'Products', route: '/products' },
    { label: 'Customers', route: '/customers' },
    { label: 'Day-by-Day Manufacturing', route: '/daily-manufacture' },
    { label: 'Zinc', route: '/zinc' },
    { label: 'Settings', route: '/settings' },
  ];

  routes(menus:any){
   this.route.navigate([`home${menus.route}`]);
  this.commonService.setTitle(menus.label);
  this.closeSidebar.emit();
  }

  isToggleClose() {
   this.closeSidebar.emit();
  }
}
