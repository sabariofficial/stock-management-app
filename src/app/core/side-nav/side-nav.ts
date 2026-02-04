import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  standalone: false,
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.css',
})
export class SideNav {
@Output() closeSidebar = new EventEmitter<void>();
constructor(private route:Router){}

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

  routes(routerLink:string){
   this.route.navigate([`home${routerLink}`])
  this.closeSidebar.emit();
  }
}
