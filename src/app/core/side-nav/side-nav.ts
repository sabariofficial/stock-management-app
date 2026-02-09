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
  menus:any[]=[]
  constructor(
    private route:Router,
    private commonService:Common
  ) { 
    this.commonService.menus.map((item) => {
      this.addMenu(item)
    })
  }

  addMenu(menu: any) {
    const exists = this.menus.some(m => m.label === menu.label);
    console.log(exists);
    
    if (!exists) {
      this.menus.push(menu);
    }
  }
  
  routes(menus:any){
    this.route.navigate([`home${menus.route}`]);
    this.commonService.setTitle(menus.label);
    this.closeSidebar.emit();
  }

  isToggleClose() {
   this.closeSidebar.emit();
  }
}
